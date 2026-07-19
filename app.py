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
from datetime import date

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st

import data_pipeline as dp
import recommendation_engine as rec_engine
import roadmap_generator as roadmap

st.set_page_config(
    page_title="Ưu tiên hoá đầu tư AI — Y tế/Dược/KHSS",
    layout="wide",
    page_icon="🩺",
)

# ═══════════════════════════════════════════════════════════════════════════
# GIAO DIỆN — CSS TUỲ CHỈNH (màu sắc, thẻ, nút bấm, sidebar)
# ═══════════════════════════════════════════════════════════════════════════
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

html, body, [data-testid="stApp"] {
    font-family: 'Inter', sans-serif;
}
[data-testid="stAppViewContainer"] {
    background: linear-gradient(180deg, #F3F6FD 0%, #F8FAFC 260px, #F8FAFC 100%);
}
[data-testid="stHeader"] { background: transparent; }

/* ---------- Sidebar ---------- */
[data-testid="stSidebar"] {
    background: linear-gradient(180deg, #1E1B4B 0%, #312E81 100%);
}
[data-testid="stSidebar"] * { color: #E0E7FF !important; }
[data-testid="stSidebar"] h1, [data-testid="stSidebar"] p { color: #FFFFFF !important; }
[data-testid="stSidebar"] hr { border-color: rgba(255,255,255,0.15); }

[data-testid="stSidebar"] div[role="radiogroup"] > label {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 12px;
    padding: 10px 14px !important;
    margin-bottom: 8px;
    transition: all 0.15s ease;
}
[data-testid="stSidebar"] div[role="radiogroup"] > label:hover {
    background: rgba(255,255,255,0.14);
    border-color: #818CF8;
}
[data-testid="stSidebar"] div[role="radiogroup"] input:checked + div {
    color: #FFFFFF !important;
    font-weight: 700 !important;
}

/* ---------- Tiêu đề trang ---------- */
h1 { color: #1E1B4B !important; font-weight: 800 !important; letter-spacing: -0.5px; }
h2, h3 { color: #312E81 !important; font-weight: 700 !important; }

/* ---------- Thẻ KPI đầy màu (page 1) ---------- */
.kpi-row { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 8px; }
.kpi-card {
    flex: 1; min-width: 180px;
    border-radius: 18px; padding: 20px 22px;
    color: white; box-shadow: 0 8px 20px -6px rgba(0,0,0,0.25);
}
.kpi-card .kpi-icon { font-size: 1.6rem; opacity: 0.9; }
.kpi-card .kpi-value { font-size: 2.1rem; font-weight: 800; margin-top: 6px; }
.kpi-card .kpi-label { font-size: 0.85rem; font-weight: 600; opacity: 0.92; margin-top: 2px;}
.kpi-c1 { background: linear-gradient(135deg, #6366F1, #4338CA); }
.kpi-c2 { background: linear-gradient(135deg, #10B981, #047857); }
.kpi-c3 { background: linear-gradient(135deg, #F59E0B, #B45309); }
.kpi-c4 { background: linear-gradient(135deg, #EC4899, #BE185D); }

/* ---------- Badge vùng (zone) ---------- */
.zone-badge {
    display: inline-block; padding: 5px 14px; border-radius: 999px;
    font-weight: 700; font-size: 0.85rem; color: white;
}

/* ---------- Nút bấm ---------- */
.stButton > button {
    border-radius: 12px !important;
    font-weight: 700 !important;
    padding: 0.55rem 1.4rem !important;
    transition: all 0.18s ease !important;
    border: none !important;
}
.stButton > button[kind="primary"] {
    background: linear-gradient(135deg, #6366F1, #4F46E5) !important;
    color: white !important;
    box-shadow: 0 6px 16px -4px rgba(79,70,229,0.55) !important;
}
.stButton > button[kind="primary"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 22px -4px rgba(79,70,229,0.65) !important;
}
.stButton > button[kind="secondary"] {
    background: #FFFFFF !important;
    color: #4338CA !important;
    border: 1.5px solid #C7D2FE !important;
}
.stButton > button[kind="secondary"]:hover {
    border-color: #6366F1 !important;
    background: #EEF2FF !important;
}
div[data-testid="stDownloadButton"] button {
    background: linear-gradient(135deg, #10B981, #059669) !important;
    color: white !important;
    border-radius: 12px !important;
    font-weight: 700 !important;
    border: none !important;
    box-shadow: 0 6px 16px -4px rgba(5,150,105,0.5) !important;
}
div[data-testid="stDownloadButton"] button:hover { transform: translateY(-2px); }

/* ---------- Slider màu ---------- */
[data-testid="stSlider"] div[role="slider"] { background-color: #4F46E5 !important; }

/* ---------- Thẻ khuyến nghị ---------- */
div[data-testid="stVerticalBlockBorderWrapper"] {
    border-radius: 16px !important;
    box-shadow: 0 3px 10px -4px rgba(30,27,75,0.12);
}

/* ---------- Stepper điều hướng trên cùng ---------- */
.stepper { display: flex; align-items: center; margin-bottom: 6px; }
.step-dot {
    width: 30px; height: 30px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 0.8rem; color: white; flex-shrink: 0;
}
.step-label { font-size: 0.78rem; font-weight: 600; margin: 0 10px 0 6px; white-space: nowrap; }
.step-line { flex: 1; height: 3px; border-radius: 2px; margin: 0 2px; }

/* ---------- Info/warning boxes bo tròn ---------- */
div[data-testid="stAlert"] { border-radius: 14px !important; }
</style>
""", unsafe_allow_html=True)

PAGE_META = [
    ("1. Tổng quan minh bạch", "🏠"),
    ("2. Bằng chứng nền", "🔎"),
    ("3. Bản đồ hành động", "🗺️"),
    ("4. Bộ khuyến nghị theo vùng", "🎯"),
    ("5. Lộ trình triển khai", "🛣️"),
    ("6. Xuất Action Plan", "📤"),
]
PAGES = [p for p, _ in PAGE_META]

ZONE_COLORS = {
    "Green Light": "#16A34A",
    "Red Light": "#DC2626",
    "R&D Opportunity": "#2563EB",
    "Low Priority": "#64748B",
}
ZONE_SOFT = {
    "Green Light": "#ECFDF5",
    "Red Light": "#FEF2F2",
    "R&D Opportunity": "#EFF6FF",
    "Low Priority": "#F1F5F9",
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


def zone_badge_html(zone: str) -> str:
    color = ZONE_COLORS.get(zone, "#64748B")
    return f'<span class="zone-badge" style="background:{color}">{zone}</span>'


def render_stepper(current_page: str):
    idx = PAGES.index(current_page)
    cols = st.columns([1] * (len(PAGE_META) * 2 - 1))
    for i, (name, icon) in enumerate(PAGE_META):
        active = i <= idx
        color = "#4F46E5" if active else "#CBD5E1"
        with cols[i * 2]:
            st.markdown(
                f'<div style="text-align:center"><div class="step-dot" '
                f'style="background:{color};margin:0 auto;">{icon}</div>'
                f'<div class="step-label" style="color:{color};text-align:center;">{i+1}</div></div>',
                unsafe_allow_html=True,
            )
        if i < len(PAGE_META) - 1:
            with cols[i * 2 + 1]:
                line_color = "#4F46E5" if i < idx else "#E2E8F0"
                st.markdown(
                    f'<div class="step-line" style="background:{line_color};margin-top:15px;"></div>',
                    unsafe_allow_html=True,
                )


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
    st.title("🏠 Tổng quan minh bạch")
    st.caption(
        "Phạm vi: O*NET-SOC Code bắt đầu bằng 29- (Lâm sàng), 31- (Hỗ trợ CSSK), "
        "19-1 (Khoa học sự sống) — chỉ giữ occupation có mặt trong CẢ dữ liệu người "
        "lao động lẫn dữ liệu chuyên gia."
    )

    n_occ = len(scope["final_occupations"])
    n_tasks = task_level["Task ID"].nunique()
    n_responses = len(scope["audited_desires"])
    n_experts_unique = scope["audited_expert"]["User ID"].nunique()

    st.markdown(f"""
    <div class="kpi-row">
        <div class="kpi-card kpi-c1"><div class="kpi-icon">🏥</div>
            <div class="kpi-value">{n_occ}</div><div class="kpi-label">Occupation đã audit</div></div>
        <div class="kpi-card kpi-c2"><div class="kpi-icon">📋</div>
            <div class="kpi-value">{n_tasks}</div><div class="kpi-label">Task (đủ dữ liệu 2 phía)</div></div>
        <div class="kpi-card kpi-c3"><div class="kpi-icon">🗣️</div>
            <div class="kpi-value">{n_responses}</div><div class="kpi-label">Phản hồi người lao động</div></div>
        <div class="kpi-card kpi-c4"><div class="kpi-icon">🧑⚕️</div>
            <div class="kpi-value">{n_experts_unique}</div><div class="kpi-label">Chuyên gia đánh giá</div></div>
    </div>
    """, unsafe_allow_html=True)
    st.write("")

    if n_occ != 4 or n_tasks != 27 or n_responses != 168:
        st.warning(
            "⚠️ Số liệu hiện tại khác với con số kỳ vọng trong tài liệu gốc "
            "(4 occupation / 27 task / 168 phản hồi). Điều này có thể do file CSV "
            "trong thư mục data/ khác phiên bản đã dùng khi thiết kế app — hãy kiểm "
            "tra lại logic merge trước khi diễn giải kết quả, đừng ép số về 4/27/168."
        )

    st.subheader("✅ Occupation đã audit (đủ dữ liệu người lao động + chuyên gia)")
    occ_summary = (
        task_level.groupby("Occupation", as_index=False)
        .agg(n_tasks=("Task ID", "nunique"),
             n_worker_responses=("n_workers", "sum"),
             n_expert_responses=("n_experts", "sum"))
        .sort_values("n_worker_responses", ascending=False)
    )
    st.dataframe(occ_summary, width="stretch", hide_index=True)

    st.subheader("🚧 Occupation trong danh mục phạm vi nhưng CHƯA có đủ dữ liệu khảo sát")
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

    st.subheader("⬇️ Tải dữ liệu đã xử lý")
    col_a, col_b = st.columns(2)
    with col_a:
        st.download_button(
            "⬇️ Tải merged_clean.csv (dữ liệu người lao động đã audit)",
            data=scope["audited_desires"].to_csv(index=False).encode("utf-8-sig"),
            file_name="merged_clean.csv", mime="text/csv", width="stretch",
        )
    with col_b:
        st.download_button(
            "⬇️ Tải task_level_table.csv (bảng cấp task)",
            data=task_level.to_csv(index=False).encode("utf-8-sig"),
            file_name="task_level_table.csv", mime="text/csv", width="stretch",
        )


# ---------------------------------------------------------------------------
# Trang 2 — Bằng chứng nền
# ---------------------------------------------------------------------------
def page_2(comparison):
    st.title("🔎 Bằng chứng nền")
    st.caption(
        "Trang này CHỈ có vai trò bằng chứng hỗ trợ — xem trong 10 giây rồi sang "
        "Trang 3. So sánh gộp Y tế/Dược/KHSS (đã audit) vs Phần còn lại của toàn bộ "
        "dữ liệu WORKBank."
    )

    left, right = st.columns(2)

    with left:
        with st.container(border=True):
            st.markdown("#### 📦 Automation Desire Rating: Y tế vs Phần còn lại")
            box_df = pd.concat([
                pd.DataFrame({"Nhóm": "Y tế/Dược/KHSS", "Automation Desire Rating": comparison["healthcare_desire"]}),
                pd.DataFrame({"Nhóm": "Phần còn lại", "Automation Desire Rating": comparison["rest_desire"]}),
            ])
            fig_box = px.box(box_df, x="Nhóm", y="Automation Desire Rating", color="Nhóm",
                              points="all", color_discrete_sequence=["#4F46E5", "#94A3B8"])
            fig_box.update_layout(showlegend=False, height=420, margin=dict(t=10))
            st.plotly_chart(fig_box, width="stretch")

            p_val = comparison["mw_p"]
            sig_note = "✅ có ý nghĩa thống kê (p < 0,05)" if p_val < 0.05 else "➖ chưa đủ bằng chứng ý nghĩa thống kê (p ≥ 0,05)"
            st.markdown(
                f"**Mann-Whitney U** = {dp.vn_number(comparison['mw_stat'], 1)}, "
                f"**p** = {dp.vn_number(p_val, 4)} → {sig_note}. "
                f"(n Y tế = {comparison['n_healthcare']}, n Phần còn lại = {comparison['n_rest']})"
            )

    with right:
        with st.container(border=True):
            st.markdown("#### 📊 13 lý do (Automation Desire + Human Agency), kèm p-value")
            chi_df = comparison["chi_table"].copy()
            chi_df["nổi bật"] = chi_df["reason"].isin([
                "HA: Domain Knowledge", "HA: Quality Oversight",
            ])
            chi_long = pd.concat([
                pd.DataFrame({"reason": chi_df["reason"], "Nhóm": "Y tế/Dược/KHSS",
                              "Tỷ lệ chọn (%)": chi_df["pct_healthcare"], "nổi bật": chi_df["nổi bật"]}),
                pd.DataFrame({"reason": chi_df["reason"], "Nhóm": "Phần còn lại",
                              "Tỷ lệ chọn (%)": chi_df["pct_rest"], "nổi bật": chi_df["nổi bật"]}),
            ])
            fig_bar = px.bar(chi_long, x="Tỷ lệ chọn (%)", y="reason", color="Nhóm",
                              orientation="h", barmode="group",
                              color_discrete_sequence=["#4F46E5", "#94A3B8"])
            fig_bar.update_layout(height=520, yaxis_title="", legend_title_text="", margin=dict(t=10))
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
        "ℹ️ Lưu ý phương pháp luận: không gắn nhãn 'có ý nghĩa thống kê' cho bất kỳ con số "
        "cấp task nào (n < 30). Không chạy ANOVA 3 nhóm nghề do không đủ lực thống kê "
        "(N=0 cho Dược, N=1 occupation cho Lâm sàng trong một số phiên bản dữ liệu)."
    )


# ---------------------------------------------------------------------------
# Trang 3 — Bản đồ 27 task theo vùng hành động
# ---------------------------------------------------------------------------
def page_3(task_level):
    st.title("🗺️ Bản đồ task theo vùng hành động")

    with st.container(border=True):
        st.slider(
            "🎚️ Risk tolerance — ngưỡng Automation Capacity Rating để coi là 'AI đủ năng lực' "
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
                  fillcolor="rgba(22,163,74,0.14)", line_width=0, layer="below")
    fig.add_shape(type="rect", x0=0.7, x1=des_th, y0=cap_th, y1=5.3,
                  fillcolor="rgba(220,38,38,0.12)", line_width=0, layer="below")
    fig.add_shape(type="rect", x0=des_th, x1=5.3, y0=0.7, y1=cap_th,
                  fillcolor="rgba(37,99,235,0.12)", line_width=0, layer="below")
    fig.add_shape(type="rect", x0=0.7, x1=des_th, y0=0.7, y1=cap_th,
                  fillcolor="rgba(100,116,139,0.10)", line_width=0, layer="below")

    for zone, color in ZONE_COLORS.items():
        sub = task_level_live[task_level_live["zone"] == zone]
        if sub.empty:
            continue
        fig.add_trace(go.Scatter(
            x=sub["desire_mean"], y=sub["capacity_mean"], mode="markers",
            marker=dict(size=sub["n_workers"] * 3 + 8, color=color, opacity=0.85,
                        line=dict(width=1.5, color="white")),
            name=zone,
            text=[f"{r.Occupation}<br>{r.Task[:60]}<br>n_workers={r.n_workers}, n_experts={r.n_experts}"
                  for r in sub.itertuples()],
            hoverinfo="text",
        ))

    fig.update_layout(
        xaxis=dict(title="Automation Desire Rating (trung bình)", range=[0.7, 5.3]),
        yaxis=dict(title="Automation Capacity Rating (trung bình)", range=[0.7, 5.3]),
        height=560, legend_title_text="Vùng", plot_bgcolor="white", margin=dict(t=20),
    )
    st.plotly_chart(fig, width="stretch")

    st.caption("💠 Kích thước điểm tỷ lệ với n_workers. Đường ngưỡng: Desire = "
               f"{dp.vn_number(des_th, 2)}, Capacity = {dp.vn_number(cap_th, 2)}.")

    st.subheader("📄 Bảng chi tiết (luôn kèm n)")
    detail = task_level_live[[
        "Task ID", "Occupation", "Task", "n_workers", "desire_mean",
        "n_experts", "capacity_mean", "trust_gap", "zone",
    ]].sort_values(["zone", "Occupation"]).copy()
    for c in ["desire_mean", "capacity_mean", "trust_gap"]:
        detail[c] = detail[c].apply(lambda v: dp.vn_number(v, 2))
    st.dataframe(detail, width="stretch", hide_index=True)

    if st.button("🎯 Dùng bản đồ này để sinh khuyến nghị →", type="primary"):
        goto("4. Bộ khuyến nghị theo vùng")
        st.rerun()


# ---------------------------------------------------------------------------
# Trang 4 — Bộ khuyến nghị theo vùng (TRANG TRỌNG TÂM)
# ---------------------------------------------------------------------------
def page_4(scope, task_level):
    st.title("🎯 Bộ khuyến nghị theo vùng (Recommendation Engine)")
    st.caption("Nhấn vào từng vùng để mở/đóng chi tiết. Task được chọn sẽ tự động cập nhật vào ô tổng hợp bên phải.")

    # 1. Thanh lọc ngưỡng cấu hình (Đặt trong Expander cho gọn màn hình)
    with st.expander("🎛️ Cấu hình ngưỡng lọc & Công thức tính (Nhấn để mở/đóng)", expanded=False):
        col_s1, col_s2 = st.columns([2, 1])
        with col_s1:
            st.slider(
                "🎚️ Risk tolerance — Ngưỡng Automation Capacity Rating:",
                min_value=1.0, max_value=5.0, step=0.25,
                key="capacity_threshold",
                help="1 = Chấp nhận rủi ro cao, 5 = Rất thận trọng (Ngưỡng Desire giữ cố định ở mức 3.0)"
            )
        with col_s2:
            st.markdown("**📐 Công thức ưu tiên:**")
            st.latex(r"score = |trust\_gap| \times \ln(n + 1)")
            st.caption("Điểm ưu tiên giúp sắp xếp task đáng chú ý nhất lên đầu trong từng nhóm.")

    cap_th = st.session_state.capacity_threshold
    des_th = st.session_state.desire_threshold

    task_level_live = dp.build_task_level_table(capacity_threshold=cap_th, desire_threshold=des_th)
    recs, scored = rec_engine.build_recommendations(
        task_level_live, scope["audited_desires"], capacity_threshold=cap_th
    )

    zone_meta = [
        ("Green Light", "🟢", "Green Light — Triển khai pilot ngay", "Các task AI đã sẵn sàng và người lao động ủng hộ."),
        ("Red Light", "🔴", "Red Light — Minh bạch & Đào tạo", "AI đủ năng lực nhưng người lao động còn e ngại (Trust Gap dương)."),
        ("R&D Opportunity", "🔵", "R&D Opportunity — Đầu tư R&D", "Người lao động muốn tự động hóa nhưng AI chưa đạt ngưỡng."),
        ("Low Priority", "⚪", "Low Priority — Tạm hoãn đầu tư", "Task chưa ưu tiên cả về nhu cầu lẫn năng lực AI trong giai đoạn này.")
    ]

    # --- BỐ CỤC 2 CỘT: TRÁI (CHỌN) | PHẢI (SUMMARY BOX) ---
    col_left, col_right = st.columns([7, 4], gap="large")

    # ==========================================
    # CỘT TRÁI: 4 MỤC LỚN (MỞ / ĐÓNG CHI TIẾT)
    # ==========================================
    with col_left:
        st.subheader("📋 Danh mục Khuyến nghị (4 Vùng)")
        
        for zone_key, icon, label, desc in zone_meta:
            items = recs.get(zone_key, [])
            n_items = len(items)
            color = ZONE_COLORS.get(zone_key, "#64748B")
            
            # Tạo tiêu đề mượt mà cho từng Expander
            expander_title = f"{icon} {label} ({n_items} task)"
            
            # Mặc định chỉ mở Green Light (hoặc mở vùng có task), các vùng khác đóng
            is_default_open = (zone_key == "Green Light" and n_items > 0)
            
            with st.expander(expander_title, expanded=is_default_open):
                st.markdown(f"<span style='color:{color}; font-weight:600;'>{desc}</span>", unsafe_allow_html=True)
                st.markdown("---")
                
                if not items:
                    st.info(f"Không có task nào thuộc vùng {zone_key} ở ngưỡng cấu hình hiện tại.")
                else:
                    for item in items:
                        key_tuple = (item["task_id"], item["occupation"], zone_key)
                        is_checked = key_tuple in st.session_state.selected_task_keys
                        
                        # Hộp hiển thị từng task trong cụm
                        with st.container(border=True):
                            c_info, c_action = st.columns([4, 1.5])
                            
                            with c_info:
                                st.markdown(f"**🧑⚕️ {item['occupation']}**")
                                st.markdown(f"📌 *{item['task']}*")
                                st.caption(f"🎯 Action: **{item['action']}**")
                                if "training_hint" in item:
                                    st.caption(f"💡 *Gợi ý:* {item['training_hint']}")
                                    
                                # Bằng chứng số liệu thu gọn
                                st.markdown(
                                    f"<small style='color:#64748B;'>📊 Score: <b>{dp.vn_number(item['priority_score'], 2)}</b> | "
                                    f"👥 Workers: {item['n_workers']} | 🧑⚕️ Experts: {item['n_experts']} | "
                                    f"Gap: {dp.vn_number(item['trust_gap'], 2)}</small>", 
                                    unsafe_allow_html=True
                                )
                            
                            with c_action:
                                st.write("") # Padding
                                # Checkbox chọn đưa vào lộ trình
                                new_val = st.checkbox(
                                    "➕ Chọn", 
                                    value=is_checked, 
                                    key=f"chk_{zone_key}_{item['task_id']}_{item['occupation']}"
                                )
                                if new_val and not is_checked:
                                    st.session_state.selected_task_keys.add(key_tuple)
                                    st.rerun() # Rerun để cập nhật ngay lập tức sang Ô Summary bên phải
                                elif (not new_val) and is_checked:
                                    st.session_state.selected_task_keys.discard(key_tuple)
                                    st.rerun()

    # ==========================================
    # CỘT PHẢI: Ô TỔNG HỢP DANH SÁCH ĐÃ CHỌN (STICKY SUMMARY)
    # ==========================================
    with col_right:
        st.subheader("🛒 Danh sách đã chọn")
        
        # Ô container chứa danh sách
        with st.container(border=True):
            selected_list = list(st.session_state.selected_task_keys)
            n_selected = len(selected_list)
            
            st.markdown(
                f"<div style='background:#EEF2FF; padding:12px; border-radius:10px; border-left:4px solid #4F46E5; margin-bottom:12px;'>"
                f"<h4 style='margin:0; color:#1E1B4B !important;'>Đã chọn: <b>{n_selected}</b> task</h4>"
                f"<span style='font-size:0.8rem; color:#4338CA;'>Các task này sẽ được chuyển trực tiếp sang Trang 5 & 6.</span>"
                f"</div>", 
                unsafe_allow_html=True
            )
            
            if n_selected == 0:
                st.warning("⚠️ Chưa có task nào được chọn.\n\n👉 *Hãy mở các vùng bên trái và tick chọn task bạn muốn đưa vào lộ trình triển khai.*")
            else:
                # Nút xóa nhanh tất cả
                if st.button("🗑️ Xóa tất cả lựa chọn", type="secondary", width="stretch"):
                    st.session_state.selected_task_keys.clear()
                    st.rerun()
                
                st.write("")
                # Hiển thị list task đã chọn với thanh cuộn (Scrollable container nếu quá dài)
                with st.container(height=380, border=False):
                    for idx, (t_id, occ, zone) in enumerate(selected_list, 1):
                        color = ZONE_COLORS.get(zone, "#64748B")
                        
                        # Thẻ từng item đã chọn
                        st.markdown(
                            f"<div style='padding:8px 10px; margin-bottom:8px; border:1px solid #E2E8F0; border-radius:8px; background:white;'>"
                            f"<div style='display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;'>"
                            f"<span style='font-size:0.75rem; font-weight:700; color:white; background:{color}; padding:2px 8px; border-radius:10px;'>{zone}</span>"
                            f"<span style='font-size:0.75rem; color:#94A3B8;'>ID: {t_id}</span>"
                            f"</div>"
                            f"<div style='font-weight:600; font-size:0.85rem; color:#1E1B4B;'>{occ}</div>"
                            f"</div>", 
                            unsafe_allow_html=True
                        )
            
            st.divider()
            
            # ==========================================
            # NÚT ĐIỀU HƯỚNG LIỀN MẠCH SANG TRANG 5
            # ==========================================
            if st.button("🛣️ Xây dựng lộ trình (Trang 5) ➔", type="primary", width="stretch", disabled=(n_selected == 0)):
                goto("5. Lộ trình triển khai")
                st.rerun()
            
            if n_selected > 0:
                st.caption("💡 *Nhấn nút trên để tự động chuyển sang trang cấu hình Gantt & RACI.*")


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
    st.title("🛣️ Quy trình & lộ trình triển khai")

    selected_items = _selected_items_from_state(scope, task_level)
    if not selected_items:
        st.warning(
            "⚠️ Chưa có task nào được chọn. Quay lại Trang 4, tick '➕ Đưa vào lộ trình' cho "
            "các task muốn lên kế hoạch."
        )
        if st.button("← Quay lại Trang 4", type="secondary"):
            goto("4. Bộ khuyến nghị theo vùng")
            st.rerun()
        return

    st.caption(f"Đang lên lộ trình cho **{len(selected_items)} task** đã chọn ở Trang 4.")

    st.subheader("📅 Gantt chart — 4 giai đoạn chuẩn")
    st.markdown(
        "**Discovery** (Tuần 1-2) → **Pilot** (Tuần 3-10, chỉ Green Light) → "
        "**Scale hoặc Hold** (Tuần 11-14, điểm quyết định go/no-go) → "
        "**Governance & Monitoring** (liên tục)."
    )
    gantt_df = roadmap.build_gantt_rows(selected_items)
    fig = roadmap.render_gantt_figure(gantt_df)
    if fig is not None:
        fig.update_layout(plot_bgcolor="white")
        st.plotly_chart(fig, width="stretch")

    with st.expander("🚦 Tiêu chí Go/No-Go tại điểm quyết định (Tuần 11-14)"):
        st.markdown(
            "- **✅ Go**: KPI pilot đạt ngưỡng đề ra + không phát sinh sự cố an toàn/chất lượng.\n"
            "- **❌ No-Go**: quay lại Discovery, hoặc chuyển task sang track Red Light "
            "(đào tạo/minh bạch hoá) nếu nguyên nhân là do con người chưa sẵn sàng."
        )

    st.subheader("👥 Bảng RACI")
    st.caption("Vai trò generic, có thể tuỳ biến — không hard-code tên người cụ thể.")
    with st.container(border=True):
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

    st.subheader("📈 KPI đo lường theo giai đoạn")
    st.caption("Đây là gợi ý chỉ số, không phải số liệu đã đo thật.")
    kpi_df = roadmap.build_kpi_table(selected_items)
    st.dataframe(kpi_df, width="stretch", hide_index=True)

    st.subheader("⚠️ Rủi ro & biện pháp giảm thiểu")
    risk_df = roadmap.build_risk_table(selected_items, scope["audited_desires"])
    st.dataframe(risk_df, width="stretch", hide_index=True)

    st.subheader("💰 Ước tính ngân sách theo tier")
    tier, reason = roadmap.estimate_budget_tier(selected_items)
    tier_color = {"Thấp": "#16A34A", "Trung bình": "#F59E0B", "Cao": "#DC2626"}.get(tier, "#64748B")
    st.markdown(
        f'<div class="kpi-card" style="background:linear-gradient(135deg,{tier_color},{tier_color}CC); '
        f'max-width:260px;"><div class="kpi-icon">💰</div>'
        f'<div class="kpi-value" style="font-size:1.5rem;">{tier}</div>'
        f'<div class="kpi-label">Tier ngân sách</div></div>',
        unsafe_allow_html=True,
    )
    st.caption(reason)

    st.write("")
    if st.button("📤 Sang Trang 6 — Xuất Action Plan →", type="primary"):
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
    st.title("📤 Xuất Action Plan")

    selected_items = _selected_items_from_state(scope, task_level)
    if not selected_items:
        st.warning("⚠️ Chưa có task nào được chọn ở Trang 4/5.")
        if st.button("← Quay lại Trang 4", type="secondary"):
            goto("4. Bộ khuyến nghị theo vùng")
            st.rerun()
        return

    raci_df = roadmap.build_raci_table(selected_items, st.session_state.role_overrides)
    kpi_df = roadmap.build_kpi_table(selected_items)
    risk_df = roadmap.build_risk_table(selected_items, scope["audited_desires"])
    tier, tier_reason = roadmap.estimate_budget_tier(selected_items)

    st.subheader("👁️ Xem trước Action Plan")
    md_content = build_action_plan_markdown(selected_items, raci_df, kpi_df, risk_df, tier, tier_reason)
    with st.container(border=True):
        st.markdown(md_content)

    st.divider()
    col_a, col_b = st.columns(2)
    with col_a:
        st.download_button(
            "⬇️ Tải action_plan.md",
            data=md_content.encode("utf-8"),
            file_name="action_plan.md", mime="text/markdown", width="stretch",
        )
    with col_b:
        csv_df = build_recommendations_csv(selected_items, raci_df, kpi_df, risk_df)
        st.download_button(
            "⬇️ Tải recommendations_export.csv",
            data=csv_df.to_csv(index=False).encode("utf-8-sig"),
            file_name="recommendations_export.csv", mime="text/csv", width="stretch",
        )


# ---------------------------------------------------------------------------
# Điều hướng chính
# ---------------------------------------------------------------------------
def main():
    st.sidebar.markdown("## 🩺 Ưu tiên hoá đầu tư AI")
    st.sidebar.caption("Y tế / Dược / Khoa học sự sống — dựa trên dữ liệu WORKBank")
    st.sidebar.markdown("---")

    radio_labels = [f"{icon}  {name}" for name, icon in PAGE_META]
    current_index = PAGES.index(st.session_state.nav_page)
    chosen_label = st.sidebar.radio("Điều hướng", radio_labels, index=current_index, label_visibility="collapsed")
    chosen_page = PAGES[radio_labels.index(chosen_label)]
    if chosen_page != st.session_state.nav_page:
        st.session_state.nav_page = chosen_page
        st.rerun()
    page = st.session_state.nav_page

    render_stepper(page)
    st.write("")

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
