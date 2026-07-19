# -*- coding: utf-8 -*-
"""
app.py
------
Ứng dụng hỗ trợ quyết định đầu tư AI cho Y tế/Dược/KHSS, dựa trên dữ liệu thật
WORKBank (SALT-NLP). 6 trang, điều hướng bằng st.sidebar.radio.

Liên kết giữa các module:
    data_pipeline.py        -> nạp/lọc/tổng hợp dữ liệu (cache bằng st.cache_data)
    recommendation_engine.py -> sinh khuyến nghị theo vùng từ bảng cấp task
    roadmap_generator.py     -> sinh lộ trình/RACI/KPI/rủi ro/ngân sách từ lựa chọn
                                 ở Trang 4 (truyền qua st.session_state)
    app.py (file này)        -> lắp ráp UI 6 trang, quản lý st.session_state
"""
import io
from datetime import date

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st

import data_pipeline as dp
import recommendation_engine as rec_engine
import roadmap_generator as roadmap

st.set_page_config(page_title="Ưu tiên hoá đầu tư AI — Y tế/Dược/KHSS", layout="wide")

# ═══════════════════════════════════════════════════════
# CẤU HÌNH GIAO DIỆN CAO CẤP (CSS STYLING)
# ═══════════════════════════════════════════════════════
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

html, body, [data-testid="stApp"], [data-testid="stAppViewContainer"] {
    background: #F8FAFC;
    color: #0F172A;
    font-family: 'Inter', sans-serif;
}

[data-testid="stSidebar"] {
    background: #FFFFFF;
    border-right: 1px solid #E2E8F0;
}

[data-testid="stHeader"] {
    background: transparent;
}

/* Custom styles for Streamlit Metrics to look like premium KPI Cards */
div[data-testid="metric-container"] {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    text-align: center;
}

div[data-testid="metric-container"] label {
    font-size: 0.85rem !important;
    font-weight: 600 !important;
    color: #64748B !important;
}

div[data-testid="metric-container"] div[data-testid="stMetricValue"] {
    font-size: 2.2rem !important;
    font-weight: 700 !important;
    color: #1E3A8A !important;
}

/* Premium Card container style */
.kpi-card {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

/* Nút bấm bo tròn cao cấp */
.stButton > button {
    border-radius: 99px !important;
    border: 1px solid #E2E8F0 !important;
    background: #FFFFFF !important;
    color: #0F172A !important;
    font-weight: 600 !important;
    padding: 0.5rem 1.5rem !important;
    transition: all 0.2s ease !important;
}

.stButton > button:hover {
    border-color: #1E3A8A !important;
    color: #1E3A8A !important;
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1) !important;
}
</style>
""", unsafe_allow_html=True)

PAGES = [
    "1. Tổng quan minh bạch",
    "2. Bằng chứng nền",
    "3. Bản đồ hành động",
    "4. Bộ khuyến nghị theo vùng",
    "5. Lộ trình triển khai",
    "6. Xuất Action Plan",
]

ZONE_COLORS = {
    "Green Light": "#2e7d32",
    "Red Light": "#c62828",
    "R&D Opportunity": "#1565c0",
    "Low Priority": "#757575",
}

# ---------------------------------------------------------------------------
# Khởi tạo session_state dùng chung xuyên suốt 6 trang
# ---------------------------------------------------------------------------
if "nav_page" not in st.session_state:
    st.session_state.nav_page = PAGES[0]
if "capacity_threshold" not in st.session_state:
    st.session_state.capacity_threshold = 3.0
if "desire_threshold" not in st.session_state:
    st.session_state.desire_threshold = 3.0
if "selected_task_keys" not in st.session_state:
    st.session_state.selected_task_keys = set()  # {(task_id, occupation, zone)}
if "role_overrides" not in st.session_state:
    st.session_state.role_overrides = {}


def goto(page_name: str):
    st.session_state.nav_page = page_name


# ---------------------------------------------------------------------------
# Nạp dữ liệu — mọi trang đều cần, nạp 1 lần và bắt lỗi rõ ràng nếu thiếu CSV
# ---------------------------------------------------------------------------
def load_everything():
    try:
        scope = dp.build_scope()
        task_level = dp.build_task_level_table(
            capacity_threshold=st.session_state.capacity_threshold,
            desire_threshold=st.session_state.desire_threshold,
        )
        comparison = dp.compare_healthcare_vs_rest()
        return scope, task_level, comparison, None
    except dp.DataLoadError as exc:
        return None, None, None, str(exc)


# ---------------------------------------------------------------------------
# Trang 1 — Tổng quan minh bạch
# ---------------------------------------------------------------------------
def page_1(scope, task_level):
    st.title("1. Tổng quan minh bạch")
    st.caption(
        "Phạm vi: O*NET-SOC Code bắt đầu bằng 29- (Lâm sàng), 31- (Hỗ trợ CSSK), "
        "19-1 (Khoa học sự sống) — chỉ giữ occupation có mặt trong CẢ dữ liệu người "
        "lao động lẫn dữ liệu chuyên gia."
    )

    n_occ = len(scope["final_occupations"])
    n_tasks = task_level["Task ID"].nunique()
    n_responses = len(scope["audited_desires"])
    n_experts_unique = scope["audited_expert"]["User ID"].nunique()

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Occupation đã audit", n_occ)
    c2.metric("Task (đủ dữ liệu 2 phía)", n_tasks)
    c3.metric("Phản hồi người lao động", n_responses)
    c4.metric("Chuyên gia đánh giá", n_experts_unique)

    if n_occ != 4 or n_tasks != 27 or n_responses != 168:
        st.warning(
            "Số liệu hiện tại khác với con số kỳ vọng trong tài liệu gốc "
            "(4 occupation / 27 task / 168 phản hồi). Điều này có thể do file CSV "
            "trong thư mục data/ khác phiên bản đã dùng khi thiết kế app — hãy kiểm "
            "tra lại logic merge trước khi diễn giải kết quả, đừng ép số về 4/27/168."
        )

    st.subheader("Occupation đã audit (đủ dữ liệu người lao động + chuyên gia)")
    occ_summary = (
        task_level.groupby("Occupation", as_index=False)
        .agg(n_tasks=("Task ID", "nunique"),
             n_worker_responses=("n_workers", "sum"),
             n_expert_responses=("n_experts", "sum"))
        .sort_values("n_worker_responses", ascending=False)
    )
    st.dataframe(occ_summary, width="stretch", hide_index=True)

    st.subheader("Occupation trong danh mục phạm vi nhưng CHƯA có đủ dữ liệu khảo sát")
    st.caption(
        "Đây là giới hạn dữ liệu quan trọng: các occupation này (vd. điều dưỡng, dược "
        "sĩ, bác sĩ lâm sàng trực tiếp nếu xuất hiện) KHÔNG được dùng để sinh khuyến "
        "nghị triển khai — chỉ có thể khuyến nghị 'thu thập dữ liệu trước'."
    )
    if scope["unaudited_occupations"]:
        st.dataframe(
            pd.DataFrame({"Occupation (trong phạm vi, thiếu dữ liệu)": scope["unaudited_occupations"]}),
            width="stretch", hide_index=True,
        )
    else:
        st.info("Không có occupation nào trong phạm vi bị thiếu dữ liệu.")

    st.subheader("Tải dữ liệu đã xử lý")
    col_a, col_b = st.columns(2)
    with col_a:
        st.download_button(
            "⬇️ Tải merged_clean.csv (dữ liệu người lao động đã audit)",
            data=scope["audited_desires"].to_csv(index=False).encode("utf-8-sig"),
            file_name="merged_clean.csv", mime="text/csv",
        )
    with col_b:
        st.download_button(
            "⬇️ Tải task_level_table.csv (bảng cấp task)",
            data=task_level.to_csv(index=False).encode("utf-8-sig"),
            file_name="task_level_table.csv", mime="text/csv",
        )


# ---------------------------------------------------------------------------
# Trang 2 — Bằng chứng nền
# ---------------------------------------------------------------------------
def page_2(comparison):
    st.title("2. Bằng chứng nền")
    st.caption(
        "Trang này CHỈ có vai trò bằng chứng hỗ trợ — xem trong 10 giây rồi sang "
        "Trang 3. So sánh gộp Y tế/Dược/KHSS (đã audit) vs Phần còn lại của toàn bộ "
        "dữ liệu WORKBank."
    )

    left, right = st.columns(2)

    with left:
        st.markdown("#### Automation Desire Rating: Y tế vs Phần còn lại")
        box_df = pd.concat([
            pd.DataFrame({"Nhóm": "Y tế/Dược/KHSS", "Automation Desire Rating": comparison["healthcare_desire"]}),
            pd.DataFrame({"Nhóm": "Phần còn lại", "Automation Desire Rating": comparison["rest_desire"]}),
        ])
        fig_box = px.box(box_df, x="Nhóm", y="Automation Desire Rating", color="Nhóm",
                          points="all", color_discrete_sequence=["#1565c0", "#9e9e9e"])
        fig_box.update_layout(showlegend=False, height=420)
        st.plotly_chart(fig_box, width="stretch")

        p_val = comparison["mw_p"]
        sig_note = "có ý nghĩa thống kê (p < 0,05)" if p_val < 0.05 else "chưa đủ bằng chứng ý nghĩa thống kê (p ≥ 0,05)"
        st.markdown(
            f"**Mann-Whitney U** = {dp.vn_number(comparison['mw_stat'], 1)}, "
            f"**p** = {dp.vn_number(p_val, 4)} → {sig_note}. "
            f"(n Y tế = {comparison['n_healthcare']}, n Phần còn lại = {comparison['n_rest']})"
        )

    with right:
        st.markdown("#### 13 lý do (Automation Desire + Human Agency), kèm p-value")
        chi_df = comparison["chi_table"].copy()
        chi_df["nổi bật"] = chi_df["reason"].isin([
            "Reasons for Human Agency - Domain Knowledge",
            "Reasons for Human Agency - Quality Oversight",
        ])
        chi_df["label_p"] = chi_df["p_value"].apply(
            lambda p: f"p={dp.vn_number(p, 3)}" + (" *n<30, không gắn nhãn ý nghĩa*" if False else "")
        )
        chi_long = pd.concat([
            pd.DataFrame({"reason": chi_df["reason"], "Nhóm": "Y tế/Dược/KHSS",
                          "Tỷ lệ chọn (%)": chi_df["pct_healthcare"], "nổi bật": chi_df["nổi bật"]}),
            pd.DataFrame({"reason": chi_df["reason"], "Nhóm": "Phần còn lại",
                          "Tỷ lệ chọn (%)": chi_df["pct_rest"], "nổi bật": chi_df["nổi bật"]}),
        ])
        fig_bar = px.bar(chi_long, x="Tỷ lệ chọn (%)", y="reason", color="Nhóm",
                          orientation="h", barmode="group",
                          color_discrete_sequence=["#1565c0", "#9e9e9e"])
        fig_bar.update_layout(height=520, yaxis_title="", legend_title_text="")
        st.plotly_chart(fig_bar, width="stretch")

        st.caption(
            "⭐ Nổi bật theo yêu cầu: **Domain Knowledge** và **Quality Oversight** "
            "(2 lý do Human Agency thường gắn với đặc thù Y tế/Dược)."
        )
        show_cols = chi_df[["reason", "pct_healthcare", "pct_rest", "chi2", "p_value"]].copy()
        show_cols.columns = ["Lý do", "% Y tế", "% Phần còn lại", "Chi-square", "p-value"]
        for c in ["% Y tế", "% Phần còn lại", "Chi-square", "p-value"]:
            show_cols[c] = show_cols[c].apply(lambda v: dp.vn_number(v, 3))
        st.dataframe(show_cols, width="stretch", hide_index=True)

    st.info(
        "Lưu ý phương pháp luận: không gắn nhãn 'có ý nghĩa thống kê' cho bất kỳ con số "
        "cấp task nào (n < 30). Không chạy ANOVA 3 nhóm nghề do không đủ lực thống kê "
        "(N=0 cho Dược, N=1 occupation cho Lâm sàng trong một số phiên bản dữ liệu)."
    )


# ---------------------------------------------------------------------------
# Trang 3 — Bản đồ 27 task theo vùng hành động
# ---------------------------------------------------------------------------
def page_3(task_level):
    st.title("3. Bản đồ hành động")

    st.slider(
        "Risk tolerance — ngưỡng Automation Capacity Rating để coi là 'AI đủ năng lực' "
        "(1 = chấp nhận rủi ro cao, 5 = rất thận trọng)",
        min_value=1.0, max_value=5.0, step=0.25,
        key="capacity_threshold",
        help="Ngưỡng Automation Desire Rating giữ cố định ở 3,0 (điểm giữa thang 1-5, "
             "nghĩa là người lao động 'muốn' tự động hoá).",
    )
    cap_th = st.session_state.capacity_threshold
    des_th = st.session_state.desire_threshold

    task_level_live = dp.build_task_level_table(capacity_threshold=cap_th, desire_threshold=des_th)

    fig = go.Figure()
    fig.add_shape(type="rect", x0=des_th, x1=5.3, y0=cap_th, y1=5.3,
                  fillcolor="rgba(46,125,50,0.12)", line_width=0, layer="below")
    fig.add_shape(type="rect", x0=0.7, x1=des_th, y0=cap_th, y1=5.3,
                  fillcolor="rgba(198,40,40,0.10)", line_width=0, layer="below")
    fig.add_shape(type="rect", x0=des_th, x1=5.3, y0=0.7, y1=cap_th,
                  fillcolor="rgba(21,101,192,0.10)", line_width=0, layer="below")
    fig.add_shape(type="rect", x0=0.7, x1=des_th, y0=0.7, y1=cap_th,
                  fillcolor="rgba(117,117,117,0.10)", line_width=0, layer="below")

    for zone, color in ZONE_COLORS.items():
        sub = task_level_live[task_level_live["zone"] == zone]
        if sub.empty:
            continue
        fig.add_trace(go.Scatter(
            x=sub["desire_mean"], y=sub["capacity_mean"], mode="markers",
            marker=dict(size=sub["n_workers"] * 3 + 8, color=color, opacity=0.8,
                        line=dict(width=1, color="white")),
            name=zone,
            text=[f"{r.Occupation}<br>{r.Task[:60]}<br>n_workers={r.n_workers}, n_experts={r.n_experts}"
                  for r in sub.itertuples()],
            hoverinfo="text",
        ))

    fig.update_layout(
        xaxis=dict(title="Automation Desire Rating (trung bình)", range=[0.7, 5.3]),
        yaxis=dict(title="Automation Capacity Rating (trung bình)", range=[0.7, 5.3]),
        height=560, legend_title_text="Vùng",
    )
    st.plotly_chart(fig, width="stretch")

    st.caption("Kích thước điểm tỷ lệ với n_workers. Đường ngưỡng: Desire = "
               f"{dp.vn_number(des_th, 2)}, Capacity = {dp.vn_number(cap_th, 2)}.")

    st.subheader("Bảng chi tiết (luôn kèm n)")
    detail = task_level_live[[
        "Task ID", "Occupation", "Task", "n_workers", "desire_mean",
        "n_experts", "capacity_mean", "trust_gap", "zone",
    ]].sort_values(["zone", "Occupation"]).copy()
    for c in ["desire_mean", "capacity_mean", "trust_gap"]:
        detail[c] = detail[c].apply(lambda v: dp.vn_number(v, 2))
    st.dataframe(detail, width="stretch", hide_index=True)

    if st.button("Dùng bản đồ này để sinh khuyến nghị →", type="primary"):
        goto("4. Bộ khuyến nghị theo vùng")
        st.rerun()


# ---------------------------------------------------------------------------
# Trang 4 — Bộ khuyến nghị theo vùng (TRANG TRỌNG TÂM)
# ---------------------------------------------------------------------------
def page_4(scope, task_level):
    st.title("4. Bộ khuyến nghị theo vùng")

    st.slider(
        "Risk tolerance — ngưỡng Automation Capacity Rating",
        min_value=1.0, max_value=5.0, step=0.25,
        key="capacity_threshold",
    )
    cap_th = st.session_state.capacity_threshold
    des_th = st.session_state.desire_threshold

    task_level_live = dp.build_task_level_table(capacity_threshold=cap_th, desire_threshold=des_th)
    recs, scored = rec_engine.build_recommendations(
        task_level_live, scope["audited_desires"], capacity_threshold=cap_th
    )

    with st.expander("📐 Công thức ưu tiên hoá (minh bạch)"):
        st.latex(r"\text{priority\_score} = |trust\_gap| \times \ln(n_{workers} + n_{experts} + 1)")
        st.markdown(
            "- **|trust_gap|**: cả trust_gap dương (AI đủ năng lực nhưng người lao động "
            "không muốn → cần thuyết phục) lẫn âm (người lao động muốn nhưng AI chưa đủ "
            "năng lực → cần đầu tư R&D) đều là tín hiệu cần hành động.\n"
            "- **log(n+1)**: giảm ảnh hưởng của cỡ mẫu cực nhỏ, tránh 1 task có n rất nhỏ "
            "nhưng trust_gap lớn bị đẩy lên ưu tiên top một cách phi lý.\n\n"
            "Điểm số này CHỈ dùng để sắp xếp thứ tự trong bảng, KHÔNG dùng để so sánh 2 "
            "task cụ thể thành câu chuyện nhân quả — luôn hiển thị kèm n bên cạnh."
        )

    zone_titles = {
        "Green Light": "🟢 Green Light — Triển khai pilot ngay",
        "Red Light": "🔴 Red Light (Trust Gap dương) — Minh bạch hoá + đào tạo trước",
        "R&D Opportunity": "🔵 R&D Opportunity — Đầu tư nghiên cứu, review sau 6-12 tháng",
        "Low Priority": "⚪ Low Priority — Không đầu tư ở giai đoạn này",
    }

    for zone in ["Green Light", "Red Light", "R&D Opportunity", "Low Priority"]:
        items = recs[zone]
        st.subheader(f"{zone_titles[zone]} ({len(items)} task)")
        if not items:
            st.caption("Không có task nào trong vùng này với ngưỡng hiện tại.")
            continue
        for item in items:
            key_tuple = (item["task_id"], item["occupation"], zone)
            col1, col2 = st.columns([5, 1])
            with col1:
                st.markdown(f"**{item['action']}**")
                if "training_hint" in item:
                    st.caption(item["training_hint"])
                st.caption(
                    f"priority_score = {dp.vn_number(item['priority_score'], 2)} · "
                    f"n_workers = {item['n_workers']} · n_experts = {item['n_experts']}"
                )
                with st.expander("Xem bằng chứng"):
                    ev = pd.DataFrame([{
                        "Task ID": item["task_id"], "Occupation": item["occupation"],
                        "Task": item["task"], "n_workers": item["n_workers"],
                        "n_experts": item["n_experts"],
                        "desire_mean": dp.vn_number(item["desire_mean"], 2),
                        "capacity_mean": dp.vn_number(item["capacity_mean"], 2),
                        "trust_gap": dp.vn_number(item["trust_gap"], 2),
                    }])
                    st.dataframe(ev, width="stretch", hide_index=True)
            with col2:
                checked = key_tuple in st.session_state.selected_task_keys
                new_val = st.checkbox("Đưa vào lộ trình", value=checked, key=f"chk_{zone}_{item['task_id']}")
                if new_val and not checked:
                    st.session_state.selected_task_keys.add(key_tuple)
                elif (not new_val) and checked:
                    st.session_state.selected_task_keys.discard(key_tuple)
            st.divider()

    st.caption(
        f"Đã chọn {len(st.session_state.selected_task_keys)} task cho Trang 5 — Lộ trình triển khai."
    )
    if st.button("Sang Trang 5 — Lộ trình triển khai →", type="primary"):
        goto("5. Lộ trình triển khai")
        st.rerun()


def _selected_items_from_state(scope, task_level: pd.DataFrame):
    """Tái tạo list[dict] đầy đủ cho các task đã chọn ở Trang 4, dùng cho Trang 5 & 6."""
    recs, scored = rec_engine.build_recommendations(
        task_level, scope["audited_desires"], capacity_threshold=st.session_state.capacity_threshold
    )
    lookup = {}
    for zone, items_list in recs.items():
        for item in items_list:
            lookup[(item["task_id"], item["occupation"], zone)] = item
            
    selected_items = []
    for key in st.session_state.selected_task_keys:
        item = lookup.get(key)
        if item is not None:
            selected_items.append(item)
    return selected_items


# ---------------------------------------------------------------------------
# Trang 5 — Quy trình & lộ trình triển khai (TRANG TRỌNG TÂM)
# ---------------------------------------------------------------------------
def page_5(scope, task_level):
    st.title("5. Lộ trình triển khai")

    selected_items = _selected_items_from_state(scope, task_level)
    if not selected_items:
        st.warning(
            "Chưa có task nào được chọn. Quay lại Trang 4, tick 'Đưa vào lộ trình' cho "
            "các task muốn lên kế hoạch."
        )
        if st.button("← Quay lại Trang 4"):
            goto("4. Bộ khuyến nghị theo vùng")
            st.rerun()
        return

    st.caption(f"Đang lên lộ trình cho {len(selected_items)} task đã chọn ở Trang 4.")

    st.subheader("Gantt chart — 4 giai đoạn chuẩn")
    st.markdown(
        "**Discovery** (Tuần 1-2) → **Pilot** (Tuần 3-10, chỉ Green Light) → "
        "**Scale hoặc Hold** (Tuần 11-14, điểm quyết định go/no-go) → "
        "**Governance & Monitoring** (liên tục)."
    )
    gantt_df = roadmap.build_gantt_rows(selected_items)
    fig = roadmap.render_gantt_figure(gantt_df)
    if fig is not None:
        st.plotly_chart(fig, width="stretch")

    with st.expander("Tiêu chí Go/No-Go tại điểm quyết định (Tuần 11-14)"):
        st.markdown(
            "- **Go**: KPI pilot đạt ngưỡng đề ra + không phát sinh sự cố an toàn/chất lượng.\n"
            "- **No-Go**: quay lại Discovery, hoặc chuyển task sang track Red Light "
            "(đào tạo/minh bạch hoá) nếu nguyên nhân là do con người chưa sẵn sàng."
        )

    st.subheader("Bảng RACI")
    st.caption("Vai trò generic, có thể tuỳ biến — không hard-code tên người cụ thể.")
    rc1, rc2, rc3, rc4 = st.columns(4)
    with rc1:
        r_resp = st.text_input("Responsible (R)", value=st.session_state.role_overrides.get(
            "Responsible", "Trưởng khoa/đơn vị liên quan"))
    with rc2:
        r_acc = st.text_input("Accountable (A)", value=st.session_state.role_overrides.get(
            "Accountable", "Giám đốc vận hành / CIO"))
    with rc3:
        r_cons = st.text_input("Consulted (C)", value=st.session_state.role_overrides.get(
            "Consulted", "Phòng CNTT, Ban An toàn người bệnh"))
    with rc4:
        r_inf = st.text_input("Informed (I)", value=st.session_state.role_overrides.get(
            "Informed", "Toàn thể nhân sự khoa/đơn vị liên quan"))
    st.session_state.role_overrides = {
        "Responsible": r_resp, "Accountable": r_acc, "Consulted": r_cons, "Informed": r_inf,
    }
    raci_df = roadmap.build_raci_table(selected_items, st.session_state.role_overrides)
    st.dataframe(raci_df, width="stretch", hide_index=True)

    st.subheader("KPI đo lường theo giai đoạn")
    st.caption("Đây là gợi ý chỉ số, không phải số liệu đã đo thật.")
    kpi_df = roadmap.build_kpi_table(selected_items)
    st.dataframe(kpi_df, width="stretch", hide_index=True)

    st.subheader("Rủi ro & biện pháp giảm thiểu")
    risk_df = roadmap.build_risk_table(selected_items, scope["audited_desires"])
    st.dataframe(risk_df, width="stretch", hide_index=True)

    st.subheader("Ước tính ngân sách theo tier")
    tier, reason = roadmap.estimate_budget_tier(selected_items)
    st.metric("Tier ngân sách", tier)
    st.caption(reason)

    if st.button("Sang Trang 6 — Xuất Action Plan →", type="primary"):
        goto("6. Xuất Action Plan")
        st.rerun()


# ---------------------------------------------------------------------------
# Trang 6 — Xuất Action Plan
# ---------------------------------------------------------------------------
def build_action_plan_markdown(selected_items, raci_df, kpi_df, risk_df, tier, tier_reason):
    lines = [
        "# Action Plan — Ưu tiên hoá đầu tư AI (Y tế/Dược/KHSS)",
        f"_Sinh tự động ngày {date.today().isoformat()} từ {len(selected_items)} task đã chọn._",
        "",
        "## 1. Khuyến nghị theo vùng",
    ]
    for item in selected_items:
        lines.append(
            f"- **[{item['zone']}]** {item['occupation']} — {item['task']} "
            f"(Task ID {item['task_id']}, n_workers={item['n_workers']}, "
            f"n_experts={item['n_experts']}, desire_mean={dp.vn_number(item['desire_mean'], 2)}, "
            f"capacity_mean={dp.vn_number(item['capacity_mean'], 2)}, "
            f"trust_gap={dp.vn_number(item['trust_gap'], 2)}, "
            f"priority_score={dp.vn_number(item['priority_score'], 2)}): {item['action']}"
        )
        if "training_hint" in item:
            lines.append(f"  - {item['training_hint']}")

    lines += ["", "## 2. Bảng RACI", raci_df.to_markdown(index=False)]
    lines += ["", "## 3. KPI theo giai đoạn", kpi_df.to_markdown(index=False)]
    lines += ["", "## 4. Rủi ro & biện pháp giảm thiểu", risk_df.to_markdown(index=False)]
    lines += ["", "## 5. Ước tính ngân sách", f"**Tier: {tier}**", "", tier_reason]
    return "\n".join(lines)


def build_recommendations_csv(selected_items, raci_df, kpi_df, risk_df):
    rows = []
    for item, (_, raci_row), (_, kpi_row), (_, risk_row) in zip(
        selected_items, raci_df.iterrows(), kpi_df.iterrows(), risk_df.iterrows()
    ):
        rows.append({
            "Task ID": item["task_id"],
            "Occupation": item["occupation"],
            "Task": item["task"],
            "Vùng": item["zone"],
            "priority_score": item["priority_score"],
            "n_workers": item["n_workers"],
            "n_experts": item["n_experts"],
            "desire_mean": item["desire_mean"],
            "capacity_mean": item["capacity_mean"],
            "trust_gap": item["trust_gap"],
            "Giai đoạn hiện tại": "Discovery",
            "Responsible": raci_row["Responsible (R)"],
            "Accountable": raci_row["Accountable (A)"],
            "Consulted": raci_row["Consulted (C)"],
            "Informed": raci_row["Informed (I)"],
            "KPI": kpi_row["KPI đề xuất theo giai đoạn"],
            "Rủi ro": risk_row["Rủi ro"],
            "Biện pháp giảm thiểu": risk_row["Biện pháp giảm thiểu"],
        })
    return pd.DataFrame(rows)


def page_6(scope, task_level):
    st.title("6. Xuất Action Plan")

    selected_items = _selected_items_from_state(scope, task_level)
    if not selected_items:
        st.warning("Chưa có task nào được chọn ở Trang 4/5.")
        if st.button("← Quay lại Trang 4"):
            goto("4. Bộ khuyến nghị theo vùng")
            st.rerun()
        return

    raci_df = roadmap.build_raci_table(selected_items, st.session_state.role_overrides)
    kpi_df = roadmap.build_kpi_table(selected_items)
    risk_df = roadmap.build_risk_table(selected_items, scope["audited_desires"])
    tier, tier_reason = roadmap.estimate_budget_tier(selected_items)

    st.subheader("Xem trước Action Plan")
    md_content = build_action_plan_markdown(selected_items, raci_df, kpi_df, risk_df, tier, tier_reason)
    st.markdown(md_content)

    st.divider()
    col_a, col_b = st.columns(2)
    with col_a:
        st.download_button(
            "⬇️ Tải action_plan.md",
            data=md_content.encode("utf-8"),
            file_name="action_plan.md", mime="text/markdown",
        )
    with col_b:
        csv_df = build_recommendations_csv(selected_items, raci_df, kpi_df, risk_df)
        st.download_button(
            "⬇️ Tải recommendations_export.csv",
            data=csv_df.to_csv(index=False).encode("utf-8-sig"),
            file_name="recommendations_export.csv", mime="text/csv",
        )


# ---------------------------------------------------------------------------
# Điều hướng chính
# ---------------------------------------------------------------------------
def main():
    st.sidebar.title("Ưu tiên hoá đầu tư AI")
    st.sidebar.caption("Y tế / Dược / Khoa học sự sống — dựa trên dữ liệu WORKBank")
    
    current_index = PAGES.index(st.session_state.nav_page)
    page = st.sidebar.radio("Điều hướng", PAGES, index=current_index)
    if page != st.session_state.nav_page:
        st.session_state.nav_page = page
        st.rerun()

    scope, task_level, comparison, err = load_everything()
    if err:
        st.error(err)
        st.info(
            "Cấu trúc thư mục kỳ vọng:\n\n"
            "```\n"
            "app.py\n"
            "data_pipeline.py\n"
            "recommendation_engine.py\n"
            "roadmap_generator.py\n"
            "data/\n"
            "  domain_worker_desires.csv\n"
            "  domain_worker_metadata.csv\n"
            "  expert_rated_technological_capability.csv\n"
            "  task_statement_with_metadata.csv\n"
            "```\n\n"
            "Tải 4 file CSV gốc tại "
            "https://huggingface.co/datasets/SALT-NLP/WORKBank và đặt vào thư mục `data/`."
        )
        return

    if page == PAGES[0]:
        page_1(scope, task_level)
    elif page == PAGES[1]:
        page_2(comparison)
    elif page == PAGES[2]:
        page_3(task_level)
    elif page == PAGES[3]:
        page_4(scope, task_level)
    elif page == PAGES[4]:
        page_5(scope, task_level)
    elif page == PAGES[5]:
        page_6(scope, task_level)


if __name__ == "__main__":
    main()
