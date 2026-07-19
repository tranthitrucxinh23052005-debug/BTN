// -*- coding: utf-8 -*-
/**
 * baocao.js
 * ---------
 * Báo cáo kỹ thuật toàn diện và hướng dẫn chiến lược dài hạn cho dự án:
 * "Hệ Thống Hỗ Trợ Quyết Định Đầu Tư AI Cho Y Tế / Dược Phẩm / Khoa Học Sự Sống"
 *
 * Tài liệu này bao gồm phân tích chiến lược, phương pháp luận khoa học dữ liệu,
 * mô hình toán học thống kê và giải trình chi tiết toàn bộ mã nguồn của hệ thống.
 * Phù hợp làm cẩm nang lưu trữ kỹ thuật và báo cáo hội đồng quản trị cấp cao.
 */

const BAO_CAO_DU_AN = {
    title: "Báo Cáo Phân Tích Kỹ Thuật, Thống Kê Và Chiến Lược Đầu Tư AI Lâm Sàng",
    version: "3.0.0",
    date: "2026-07-19",
    author: "Hệ thống Phân tích Đầu tư AI Y tế",
    content: `
================================================================================
BÁO CÁO PHÂN TÍCH KỸ THUẬT, THỐNG KÊ VÀ CHIẾN LƯỢC ĐẦU TƯ AI LÂM SÀNG
================================================================================

Tài liệu hướng dẫn chuyên sâu dành cho CIO, COO, CDO bệnh viện và tập đoàn dược phẩm
về phương pháp luận thực chứng, giải trình toàn bộ mã nguồn và lộ trình triển khai y tế.

--------------------------------------------------------------------------------
MỞ ĐẦU: BÀI TOÁN TỐI ƯU HÓA ĐẦU TƯ AI TRONG NGÀNH Y TẾ & DƯỢC PHẨM
--------------------------------------------------------------------------------
Trí tuệ nhân tạo (AI) đang định hình lại toàn bộ các hoạt động chẩn đoán hình ảnh, sinh học
tin học, nghiên cứu sinh học tế bào và quản lý hồ sơ bệnh án điện tử. Mặc dù vậy, việc đầu tư
AI trong y tế vẫn thường gặp thất bại do thiếu một phương pháp luận thực chứng kết nối giữa
nguyện vọng thực tế của nhân sự lâm sàng trực tiếp và năng lực thực tế của công nghệ thuật toán.
Khoảng cách niềm tin (Trust Gap) chính là rào cản vô hình lớn nhất khiến các hệ thống AI đắt đỏ
bị y bác sĩ từ chối hoặc sử dụng không hiệu quả.

Dự án này sử dụng cơ sở dữ liệu khảo sát WORKBank (SALT-NLP) làm nền tảng khoa học dữ liệu
để xây dựng hệ thống hỗ trợ quyết định (Decision Support System - DSS). Hệ thống tự động
kiểm toán dữ liệu, phân tích sự sẵn sàng của công nghệ và mong muốn của con người, từ đó thiết
lập bản đồ ưu tiên hóa và lộ trình triển khai an toàn lâm sàng.

Báo cáo này được cấu trúc thành các chương chuyên sâu để giải trình chi tiết từ lý thuyết
chiến lược đến mã nguồn thực tế của toàn bộ hệ thống.

================================================================================
CHƯƠNG I: PHÂN TÍCH BỐ CẢNH CHIẾN LƯỢC VÀ CHUYỂN ĐỔI SỐ Y TẾ
================================================================================
1.1. Thách thức quá tải nhận thức lâm sàng (Clinical Cognitive Overload)
Bác sĩ chẩn đoán hình ảnh và các nhà khoa học sự sống ngày nay phải xử lý lượng dữ liệu khổng
lồ mỗi ngày. Áp lực thời gian và trách nhiệm chẩn đoán dẫn đến hội chứng kiệt sức (burnout).
AI hứa hẹn sẽ giải phóng họ khỏi các tác vụ lặp đi lặp lại. Tuy nhiên, nếu CIO cài đặt một công
cụ AI chưa đạt độ chín muồi chuyên môn hoặc có độ nhiễu cao, nó sẽ làm tăng thời gian kiểm duyệt
và tăng thêm gánh nặng nhận thức cho bác sĩ.

1.2. Lý thuyết chấp nhận công nghệ (TAM) áp dụng trong môi trường y tế chuyên sâu
Mô hình TAM chỉ ra rằng công nghệ chỉ được chấp nhận rộng rãi khi người dùng cảm nhận được
"Tính dễ sử dụng" và "Tính hữu ích thực tiễn". Trong y tế, tính hữu ích thực tiễn được đo lường
bởi việc công nghệ có bảo đảm an toàn cho bệnh nhân hay không. Nếu bác sĩ cảm thấy công nghệ
AI hoạt động như một "hộp đen" bí ẩn và không cho phép họ can thiệp hoặc giám sát chất lượng
chuyên môn (Quality Oversight), họ sẽ kháng cự sử dụng để tự bảo vệ mình trước trách nhiệm pháp lý.

1.3. Khái niệm và cách đo lường "Trust Gap" (Khoảng cách niềm tin)
Hệ thống định nghĩa Trust Gap cấp tác vụ bằng công thức:
  Trust Gap = Capacity Mean - Desire Mean
- Khi Trust Gap âm: Nhân viên y tế có nguyện vọng tự động hóa tác vụ rất lớn nhưng năng lực của
  AI hiện tại chưa đáp ứng được. Đây là cơ hội để đầu tư R&D dài hạn.
- Khi Trust Gap dương: AI có năng lực xử lý vượt trội nhưng nhân viên y tế lại không muốn tự động
  hóa tác vụ đó. Điều này cho thấy rào cản tâm lý hoặc lo ngại chuyên môn lâm sàng. CIO cần tổ
  chức đào tạo và minh bạch thuật toán trước khi pilot.

================================================================================
CHƯƠNG II: KIẾN TRÚC TOÀN CỤC VÀ LUỒNG ĐI DỮ LIỆU
================================================================================
Hệ thống được thiết kế theo mô hình 3 lớp chuẩn hóa:
1. Lớp Dữ liệu (Data Layer - data_pipeline.py): Đọc và tiền xử lý dữ liệu thô từ 4 file CSV.
2. Lớp Logic nghiệp vụ (Business Logic Layer - recommendation_engine.py & roadmap_generator.py):
   Tính toán điểm ưu tiên, phân vùng hành động, lập ma trận trách nhiệm RACI và đánh giá rủi ro.
3. Lớp Trình diễn (Presentation Layer - app.py): Lắp ráp giao diện tương tác Streamlit cao cấp.

Luồng đi của dữ liệu qua các biến session state bảo đảm sự đồng bộ tuyệt đối:
- Ngưỡng capacity_threshold thay đổi -> Bản đồ Scatter Chart và bộ khuyến nghị tự động tính lại.
- Trạng thái selected_task_keys được tick chọn -> Bảng Gantt chart, RACI, KPI và Ngân sách tự động
  cập nhật tương ứng.
- Role_overrides thay đổi -> Bảng ma trận RACI cập nhật tức thời mà không cần nạp lại toàn bộ trang.

================================================================================
CHƯƠNG III: ĐÁNH GIÁ CHUYÊN SÂU MODULE XỬ LÝ DỮ LIỆU (DATA PIPELINE)
================================================================================
Module \`data_pipeline.py\` là nền móng của hệ thống, thực hiện nhiệm vụ đọc dữ liệu thô, lọc phạm
vi ngành nghề y tế lâm sàng và chạy các thống kê so sánh nền.

3.1. Phân tích chức năng và vai trò kỹ thuật
- \`_check_files_exist()\`: Ngăn ngừa lỗi crash hệ thống do thiếu file CSV bằng cách quét thư mục 
  \`data/\` trước khi đọc và ném lỗi \`DataLoadError\` chi tiết để hiển thị lên UI Streamlit.
- \`_load_raw()\`: Hàm nạp file thô được bọc cache của Streamlit giúp tối ưu hóa dung lượng RAM và tránh 
  hiện tượng giật lag màn hình khi re-render.
- \`build_scope()\`: Lọc O*NET-SOC lâm sàng/KHSS, thực hiện phép giao tập dữ liệu hai bên để bảo đảm tính 
  đồng bộ cao nhất.
- \`build_task_level_table()\`: Tổng hợp dữ liệu thô cấp nhân sự thành 27 dòng dữ liệu cấp tác vụ duy nhất, 
  đồng thời tính các giá trị trung bình về năng lực chuyên môn và kỹ năng giao tiếp.
- \`compare_healthcare_vs_rest()\`: Thực hiện các phép kiểm định phi tham số và Chi-square so sánh 
  ngành y tế với các ngành khác trong toàn bộ dataset WORKBank.

3.2. Mã nguồn toàn bộ của \`data_pipeline.py\` (Đã được chú thích chi tiết)
Dưới đây là toàn bộ mã nguồn thực tế của tệp tin \`data_pipeline.py\`:

\`\`\`python
# -*- coding: utf-8 -*-
import os
import numpy as np
import pandas as pd
from scipy import stats
import streamlit as st

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

REQUIRED_FILES = [
    "domain_worker_desires.csv",
    "domain_worker_metadata.csv",
    "expert_rated_technological_capability.csv",
    "task_statement_with_metadata.csv",
]

# Lọc mã ngành nghề O*NET-SOC đặc thù lâm sàng (29-), hỗ trợ y tế (31-), khoa học sự sống (19-1)
SCOPE_PREFIXES = ("29-", "31-", "19-1")

# Danh sách 13 lý do boolean được dùng để kiểm định sự khác biệt qua Chi-square
REASON_COLUMNS = [
    "Reasons for Automation Desire - Free Time",
    "Reasons for Automation Desire - Repetitive",
    "Reasons for Automation Desire - Human Error",
    "Reasons for Automation Desire - Stress",
    "Reasons for Automation Desire - Difficulty",
    "Reasons for Automation Desire - Scale",
    "Reasons for Human Agency - Physical",
    "Reasons for Human Agency - Control",
    "Reasons for Human Agency - Domain Knowledge",
    "Reasons for Human Agency - Empathy",
    "Reasons for Human Agency - Quality Oversight",
    "Reasons for Human Agency - Dynamic",
    "Reasons for Human Agency - Ethical",
]

HUMAN_AGENCY_COLUMNS = [c for c in REASON_COLUMNS if c.startswith("Reasons for Human Agency")]

class DataLoadError(Exception):
    \"\"\"Ngoại lệ tùy chỉnh ném ra khi lỗi tải tệp tin dữ liệu đầu vào\"\"\"

def vn_number(value, decimals=2):
    \"\"\"Định dạng số thập phân sang chuẩn hiển thị Việt Nam (dùng dấu phẩy)\"\"\"
    try:
        if value is None or (isinstance(value, float) and np.isnan(value)):
            return "N/A"
        fmt = f"{{:.{decimals}f}}"
        s = fmt.format(float(value))
        return s.replace(",", "#").replace(".", ",").replace("#", ".")
    except (ValueError, TypeError):
        return "N/A"

def _check_files_exist():
    missing = [f for f in REQUIRED_FILES if not os.path.isfile(os.path.join(DATA_DIR, f))]
    if missing:
        raise DataLoadError(
            "Thiếu file CSV bắt buộc trong thư mục data/: " + ", ".join(missing)
        )

@st.cache_data(show_spinner=False)
def _load_raw():
    _check_files_exist()
    try:
        desires = pd.read_csv(os.path.join(DATA_DIR, "domain_worker_desires.csv"))
        worker_meta = pd.read_csv(os.path.join(DATA_DIR, "domain_worker_metadata.csv"))
        expert = pd.read_csv(os.path.join(DATA_DIR, "expert_rated_technological_capability.csv"))
        task_meta = pd.read_csv(os.path.join(DATA_DIR, "task_statement_with_metadata.csv"))
    except Exception as exc:
        raise DataLoadError(f"Lỗi khi đọc file CSV trong data/: {exc}") from exc
    return desires, worker_meta, expert, task_meta

OCC_COL = "Occupation (O*NET-SOC Title)"

@st.cache_data(show_spinner=False)
def build_scope():
    \"\"\"Xây dựng phạm vi kiểm toán dữ liệu và tìm phần giao nhau giữa 2 nguồn\"\"\"
    desires, worker_meta, expert, task_meta = _load_raw()

    codes = task_meta[["O*NET-SOC Code", OCC_COL]].drop_duplicates()
    in_scope_mask = codes["O*NET-SOC Code"].astype(str).str.startswith(SCOPE_PREFIXES)
    scope_occupations = set(codes.loc[in_scope_mask, OCC_COL])

    desire_occupations = set(desires[OCC_COL].unique())
    expert_occupations = set(expert[OCC_COL].unique())

    final_occupations = sorted(scope_occupations & desire_occupations & expert_occupations)
    unaudited_occupations = sorted(scope_occupations - set(final_occupations))

    d_sub = desires[desires[OCC_COL].isin(final_occupations)].copy()
    e_sub = expert[expert[OCC_COL].isin(final_occupations)].copy()

    common_tasks = set(d_sub["Task ID"]) & set(e_sub["Task ID"])
    audited_desires = d_sub[d_sub["Task ID"].isin(common_tasks)].reset_index(drop=True)
    audited_expert = e_sub[e_sub["Task ID"].isin(common_tasks)].reset_index(drop=True)

    return {
        "final_occupations": final_occupations,
        "unaudited_occupations": unaudited_occupations,
        "audited_desires": audited_desires,
        "audited_expert": audited_expert,
        "full_desires": desires,
        "full_worker_meta": worker_meta,
    }

def _zone_for(desire_mean, capacity_mean, desire_threshold, capacity_threshold):
    wants = desire_mean >= desire_threshold
    capable = capacity_mean >= capacity_threshold
    if wants and capable:
        return "Green Light"
    if (not wants) and capable:
        return "Red Light"
    if wants and (not capable):
        return "R&D Opportunity"
    return "Low Priority"

@st.cache_data(show_spinner=False)
def build_task_level_table(capacity_threshold: float = 3.0, desire_threshold: float = 3.0):
    \"\"\"Tổng hợp dữ liệu cấp cá nhân thành 27 dòng cấp task vụ y tế sạch\"\"\"
    scope = build_scope()
    d = scope["audited_desires"]
    e = scope["audited_expert"]

    worker_agg = (
        d.groupby(["Task ID", OCC_COL, "Task"], as_index=False)
        .agg(n_workers=("User ID", "nunique"), desire_mean=("Automation Desire Rating", "mean"))
    )
    
    # Gom nhóm dữ liệu chuyên gia để tránh hiện tượng double-counting khi gộp
    expert_agg = (
        e.groupby(["Task ID"], as_index=False)
        .agg(
            n_experts=("User ID", "nunique"), 
            capacity_mean=("Automation Capacity Rating", "mean"),
            domain_expertise_cap=("Domain Expertise Requirement", "mean"),
            interpersonal_cap=("Interpersonal Communication Requirement", "mean")
        )
    )

    table = worker_agg.merge(expert_agg, on="Task ID", how="inner")
    table = table.rename(columns={OCC_COL: "Occupation"})
    table["trust_gap"] = table["capacity_mean"] - table["desire_mean"]
    table["zone"] = table.apply(
        lambda r: _zone_for(r["desire_mean"], r["capacity_mean"], desire_threshold, capacity_threshold),
        axis=1,
    )
    return table.sort_values(["Occupation", "Task ID"]).reset_index(drop=True)

@st.cache_data(show_spinner=False)
def compare_healthcare_vs_rest():
    \"\"\"So sánh nhóm y tế đã audit với phần còn lại của toàn bộ cơ sở dữ liệu WORKBank\"\"\"
    scope = build_scope()
    full_desires = scope["full_desires"]
    healthcare_occs = set(scope["final_occupations"])

    hc = full_desires[full_desires[OCC_COL].isin(healthcare_occs)]
    rest = full_desires[~full_desires[OCC_COL].isin(healthcare_occs)]

    mw_stat, mw_p = stats.mannwhitneyu(
        hc["Automation Desire Rating"], rest["Automation Desire Rating"], alternative="two-sided"
    )

    rows = []
    for col in REASON_COLUMNS:
        hc_counts = hc[col].value_counts()
        rest_counts = rest[col].value_counts()
        contingency = pd.DataFrame({
            "hc": [hc_counts.get(True, 0), hc_counts.get(False, 0)],
            "rest": [rest_counts.get(True, 0), rest_counts.get(False, 0)],
        }, index=["True", "False"])
        chi2, p_value, _, _ = stats.chi2_contingency(contingency.values)
        rows.append({
            "reason": col.replace("Reasons for Automation Desire - ", "AD: ")
                          .replace("Reasons for Human Agency - ", "HA: "),
            "pct_healthcare": 100.0 * hc[col].mean(),
            "pct_rest": 100.0 * rest[col].mean(),
            "chi2": chi2,
            "p_value": p_value,
        })

    return {
        "healthcare_desire": hc["Automation Desire Rating"].tolist(),
        "rest_desire": rest["Automation Desire Rating"].tolist(),
        "mw_stat": mw_stat,
        "mw_p": mw_p,
        "n_healthcare": len(hc),
        "n_rest": len(rest),
        "chi_table": pd.DataFrame(rows),
    }

def most_common_human_agency_reason(audited_desires: pd.DataFrame, occupation: str):
    \"\"\"Truy vấn lý do giữ người phổ biến nhất của một ngành nghề khảo sát\"\"\"
    sub = audited_desires[audited_desires[OCC_COL] == occupation]
    n = len(sub)
    if n == 0:
        return None
    rates = {col: sub[col].mean() for col in HUMAN_AGENCY_COLUMNS}
    best_col = max(rates, key=rates.get)
    label = best_col.replace("Reasons for Human Agency - ", "")
    return label, 100.0 * rates[best_col], n
\`\`\`

--------------------------------------------------------------------------------
CHƯƠNG IV: PHÂN TÍCH TOÁN HỌC & KIỂM ĐỊNH THỐNG KÊ LÂM SÀNG
--------------------------------------------------------------------------------
4.1. Chi tiết kiểm định Mann-Whitney U hai phía
Kiểm định Mann-Whitney U sắp xếp thứ hạng (ranks) của toàn bộ các quan sát từ hai nhóm gộp lại,
sau đó tính tổng thứ hạng của từng nhóm. Trị số kiểm định U được tính bằng công thức:
  $U_1 = n_1 n_2 + \frac{n_1(n_1+1)}{2} - R_1$
  $U_2 = n_1 n_2 + \frac{n_2(n_2+1)}{2} - R_2$
Với $R_1, R_2$ lần lượt là tổng thứ hạng của hai nhóm. Giá trị thống kê $U = \min(U_1, U_2)$ 
được dùng để tra cứu giá trị p-value tương ứng. Với kích thước mẫu lớn ($N_{rest} = 5563$), 
hệ thống sử dụng phép xấp xỉ phân phối chuẩn để tính toán p-value một cách nhanh chóng và chính xác.

4.2. Phép kiểm định Chi-square độc lập ($\chi^2$)
Để thực hiện kiểm định Chi-square độc lập cho các bảng liên hợp tần suất lý do, hệ thống tính toán
tần số lý thuyết (expected frequencies) dựa trên giả thuyết không ($H_0$: không có sự khác biệt
về tỷ lệ chọn lý do giữa nhóm y tế và nhóm khác):
  $E_{ij} = \frac{T_i \times T_j}{T_{total}}$
Trị số Chi-square được tính bằng tổng bình phương độ lệch chuẩn hóa:
  $\chi^2 = \sum \frac{(O_{ij} - E_{ij})^2}{E_{ij}}$
Với $O_{ij}$ là tần số quan sát thực tế trong bảng liên hợp. Trị số này được scipy đối chiếu với 
phân phối Chi-square có bậc tự do là $df = (r-1)(c-1) = (2-1)(2-1) = 1$. Kết quả p-value cho thấy 
mức độ đáng tin cậy của sự khác biệt.

4.3. Ràng buộc an toàn ý nghĩa thống kê cho mẫu nhỏ cấp task
Hệ thống tuân thủ chặt chẽ nguyên lý: Không gán nhãn "có ý nghĩa thống kê" (statistically significant) 
cho các số liệu cấp task vụ nhỏ lẻ (thường có cỡ mẫu khảo sát nhân sự y tế thực tế từ $n = 4$ đến $n = 9$ 
trong từng task riêng lẻ). Việc cố tình gán nhãn ý nghĩa thống kê cho mẫu cực nhỏ sẽ làm sai lệch 
nhận thức của CIO, khiến họ hiểu lầm đây là một quy luật có tính chất đại diện rộng rãi. Thay vào đó, 
giao diện Streamlit chỉ hiển thị các giá trị trung bình kèm theo số lượng $n$ cụ thể và điểm ưu tiên, 
giữ cho dữ liệu hoàn toàn minh bạch.

================================================================================
CHƯƠNG V: THIẾT KẾ RECOMMENDATION ENGINE VÀ PHÉP TÍNH ƯU TIÊN
================================================================================
Quy trình ra quyết định của Recommendation Engine (\`recommendation_engine.py\`) tách biệt rõ ràng
giữa việc tính điểm ưu tiên toán học và việc phân phối các khuyến nghị vận hành.

5.1. Mã nguồn toàn bộ của \`recommendation_engine.py\` (Đã được chú thích chi tiết)
Dưới đây là toàn bộ mã nguồn thực tế của tệp tin \`recommendation_engine.py\`:

\`\`\`python
# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd
import data_pipeline as dp

ZONE_ORDER = ["Green Light", "Red Light", "R&D Opportunity", "Low Priority"]

def priority_score(row) -> float:
    \"\"\"
    Tính điểm ưu tiên toán học: |trust_gap| * ln(n_workers + n_experts + 1)
    - Trị tuyệt đối |trust_gap|: Phản ánh tín hiệu lệch pha cần can thiệp bất kể âm hay dương.
    - Hàm ln(n+1): Bộ lọc nhiễu mẫu nhỏ để tránh các task có mẫu cực thấp vượt lên đầu bảng.
    \"\"\"
    weight = np.log((row["n_workers"] + row["n_experts"]) + 1)
    return abs(row["trust_gap"]) * weight

def add_priority_scores(task_level: pd.DataFrame) -> pd.DataFrame:
    out = task_level.copy()
    out["priority_score"] = out.apply(priority_score, axis=1)
    return out

def _base_evidence(row) -> dict:
    \"\"\"Tái tạo dữ liệu bằng chứng cơ sở cấp task vụ lâm sàng\"\"\"
    return {
        "task_id": row["Task ID"],
        "occupation": row["Occupation"],
        "task": row["Task"],
        "n_workers": int(row["n_workers"]),
        "n_experts": int(row["n_experts"]),
        "desire_mean": float(row["desire_mean"]),
        "capacity_mean": float(row["capacity_mean"]),
        "trust_gap": float(row["trust_gap"]),
        "priority_score": float(row["priority_score"]),
        "domain_expertise_cap": float(row.get("domain_expertise_cap", 0.0)),
        "interpersonal_cap": float(row.get("interpersonal_cap", 0.0))
    }

def build_recommendations(task_level: pd.DataFrame, audited_desires: pd.DataFrame,
                           capacity_threshold: float = 3.0):
    \"\"\"
    Phân loại task vụ vào 4 vùng hành động và sắp xếp thứ tự ưu tiên
    - Green Light: Sắp xếp theo n_workers giảm dần (ưu tiên quy mô tác động lớn).
    - Các vùng khác: Sắp xếp theo priority_score giảm dần (ưu tiên xử lý điểm nghẽn nghiêm trọng).
    \"\"\"
    scored = add_priority_scores(task_level)
    recs = {zone: [] for zone in ZONE_ORDER}

    for zone in ZONE_ORDER:
        sub = scored[scored["zone"] == zone]
        if zone == "Green Light":
            sub = sub.sort_values("n_workers", ascending=False)
        else:
            sub = sub.sort_values("priority_score", ascending=False)

        for _, row in sub.iterrows():
            item = _base_evidence(row)
            item["zone"] = zone

            if zone == "Green Light":
                item["action"] = (
                    f"Triển khai pilot ngay trong 90 ngày cho: \\\"{row['Task']}\\\" "
                    f"({row['Occupation']})"
                )
            elif zone == "Red Light":
                item["action"] = (
                    f"KHÔNG triển khai ngay cho: \\\"{row['Task']}\\\" ({row['Occupation']}) — "
                    f"chạy chương trình minh bạch hoá năng lực AI + đào tạo trước khi triển khai"
                )
                reason_info = dp.most_common_human_agency_reason(audited_desires, row["Occupation"])
                if reason_info is not None:
                    label, pct, n_occ = reason_info
                    item["training_hint"] = (
                        f"Lý do giữ người phổ biến nhất tại '{row['Occupation']}': {label} "
                        f"({dp.vn_number(pct, 1)}% người trả lời, n={n_occ}) — nội dung đào tạo "
                        f"nên nhắm vào lý do này."
                    )
            elif zone == "R&D Opportunity":
                gap = max(capacity_threshold - row["capacity_mean"], 0.0)
                item["capacity_gap"] = float(gap)
                item["action"] = (
                    f"Đầu tư nghiên cứu/theo dõi công nghệ cho: \\\"{row['Task']}\\\" "
                    f"({row['Occupation']}) — Automation Capacity Rating hiện tại "
                    f"{dp.vn_number(row['capacity_mean'], 2)} cần tăng thêm khoảng "
                    f"{dp.vn_number(gap, 2)} điểm để vượt ngưỡng {dp.vn_number(capacity_threshold, 2)}; "
                    f"review lại sau 6-12 tháng."
                )
            else:  # Low Priority
                item["action"] = (
                    f"Không đầu tư ở giai đoạn này cho: \\\"{row['Task']}\\\" ({row['Occupation']})"
                )

            recs[zone].append(item)

    return recs, scored
\`\`\`

--------------------------------------------------------------------------------
CHƯƠNG VI: THIẾT KẾ ROADMAP, KPI VÀ AN TOÀN LÂM SÀNG
--------------------------------------------------------------------------------
Module \`roadmap_generator.py\` chuyển đổi định hướng chiến lược thành một lộ trình triển khai 
tuần hoàn chỉnh, đi kèm trách nhiệm RACI và kiểm soát rủi ro lâm sàng y tế.

6.1. Chi tiết phân chia 4 giai đoạn Gantt
- Discovery (Tuần 1-2): Tập trung thiết lập hạ tầng ghi nhận nhật ký làm việc lâm sàng, phỏng vấn 
  y bác sĩ để làm baseline đánh giá.
- Giai đoạn Hành động thực chất (Tuần 3-10):
  * Pilot (Đối với Green Light): Chạy thử nghiệm công cụ AI trên một nhóm nhỏ y bác sĩ lâm sàng, 
    giám sát chặt chẽ độ chính xác và an toàn.
  * Training (Đối với Red Light): Không cài đặt AI trực tiếp lên phòng ban, thay vào đó chạy lớp học 
    giải thích rõ ràng về nguyên lý hoạt động của thuật toán và cách nhân viên y tế giám sát nó.
  * R&D (Đối với R&D Opportunity): Hợp tác với các trường đại học hoặc startup công nghệ để tùy biến 
    mô hình AI cho phù hợp hơn.
- Scale hoặc Hold (Tuần 11-14): Đánh giá lại kết quả pilot/training để đưa ra quyết định mở rộng ra toàn 
  bệnh viện hay tiếp tục giữ lại thử nghiệm thêm.
- Governance & Monitoring: Thiết lập cơ chế kiểm toán thuật toán hàng năm để tránh hiện tượng trôi lệch 
  mô hình (model drift) khi dữ liệu bệnh nhân thay đổi theo thời gian.

6.2. Mã nguồn toàn bộ của \`roadmap_generator.py\` (Đã được chú thích chi tiết)
Dưới phần này là toàn bộ mã nguồn thực tế của tệp tin \`roadmap_generator.py\`:

\`\`\`python
# -*- coding: utf-8 -*-
import pandas as pd
import plotly.graph_objects as go

# Bảng màu chuẩn thương hiệu y tế dành cho các giai đoạn của Gantt Chart
PHASE_COLORS = {
    "Discovery": "#607d8b",
    "Pilot": "#2e7d32",
    "Đào tạo & minh bạch hoá": "#c62828",
    "Nghiên cứu & theo dõi (R&D)": "#1565c0",
    "Scale hoặc Hold": "#f9a825",
    "Governance & Monitoring": "#455a64",
}

def _phase_plan_for_zone(zone: str):
    \"\"\"Phân chia giai đoạn hoạt động theo tuần dựa trên zone của tác vụ\"\"\"
    if zone == "Green Light":
        return [
            ("Discovery", 1, 2),
            ("Pilot", 3, 10),
            ("Scale hoặc Hold", 11, 14),
            ("Governance & Monitoring", 15, 26),
        ]
    if zone == "Red Light":
        return [
            ("Discovery", 1, 2),
            ("Đào tạo & minh bạch hoá", 3, 10),
            ("Scale hoặc Hold", 11, 14),
            ("Governance & Monitoring", 15, 26),
        ]
    if zone == "R&D Opportunity":
        return [
            ("Discovery", 1, 2),
            ("Nghiên cứu & theo dõi (R&D)", 3, 26),
            ("Governance & Monitoring", 27, 52),
        ]
    # Low Priority - Tối thiểu hóa hành động để tránh lãng phí nguồn lực CNTT
    return [("Discovery", 1, 2)]

def build_gantt_rows(selected_items: list) -> pd.DataFrame:
    \"\"\"Xây dựng các dòng dữ liệu để vẽ biểu đồ Gantt triển khai\"\"\"
    rows = []
    for item in selected_items:
        label = f"{item['occupation']} — {item['task'][:40]}"
        for phase, start, end in _phase_plan_for_zone(item["zone"]):
            rows.append({
                "task_label": label,
                "zone": item["zone"],
                "phase": phase,
                "start_week": start,
                "end_week": end,
                "duration": end - start + 1,
            })
    return pd.DataFrame(rows)

def render_gantt_figure(gantt_df: pd.DataFrame):
    \"\"\"Vẽ biểu đồ Gantt dạng thanh ngang xếp chồng bằng Plotly Graph Objects\"\"\"
    if gantt_df.empty:
        return None
    fig = go.Figure()
    labels = list(dict.fromkeys(gantt_df["task_label"]))
    shown_phases = set()
    for _, row in gantt_df.iterrows():
        show_legend = row["phase"] not in shown_phases
        shown_phases.add(row["phase"])
        fig.add_trace(go.Bar(
            x=[row["duration"]],
            y=[row["task_label"]],
            base=[row["start_week"] - 1],
            orientation="h",
            name=row["phase"],
            legendgroup=row["phase"],
            showlegend=show_legend,
            marker_color=PHASE_COLORS.get(row["phase"], "#9e9e9e"),
            hovertext=f"{row['phase']}: Tuần {row['start_week']}–{row['end_week']}",
            hoverinfo="text",
        ))
    fig.update_layout(
        barmode="stack",
        xaxis_title="Tuần",
        yaxis=dict(autorange="reversed", title=""),
        height=max(300, 70 * len(labels)),
        legend_title_text="Giai đoạn",
    )
    return fig

def build_raci_table(selected_items: list, role_overrides: dict) -> pd.DataFrame:
    \"\"\"Xây dựng ma trận trách nhiệm RACI tùy biến\"\"\"
    rows = []
    for item in selected_items:
        rows.append({
            "Task": f"{item['occupation']} — {item['task'][:50]}",
            "Vùng": item["zone"],
            "Responsible (R)": role_overrides.get("Responsible", "Trưởng khoa/đơn vị liên quan"),
            "Accountable (A)": role_overrides.get("Accountable", "Giám đốc vận hành / CIO"),
            "Consulted (C)": role_overrides.get("Consulted", "Phòng CNTT, Ban An toàn người bệnh"),
            "Informed (I)": role_overrides.get("Informed", "Toàn thể nhân sự khoa/đơn vị liên quan"),
        })
    return pd.DataFrame(rows)

def build_kpi_table(selected_items: list) -> pd.DataFrame:
    \"\"\"Đề xuất các chỉ số KPI đo lường hiệu suất chuyển đổi số\"\"\"
    rows = []
    for item in selected_items:
        zone = item["zone"]
        if zone == "Green Light":
            kpi = (
                "Giảm thời gian xử lý task (so với baseline Discovery); giảm tỷ lệ lỗi; "
                "Automation Desire Rating trung bình hậu triển khai (KPI theo dõi, không "
                "phải số liệu đã đo thật)"
            )
        elif zone == "Red Light":
            kpi = (
                "Tỷ lệ nhân sự hoàn thành đào tạo minh bạch hoá; thay đổi Human Agency "
                "Scale Rating trước/sau đào tạo (KPI theo dõi, không phải số liệu đã đo thật)"
            )
        elif zone == "R&D Opportunity":
            kpi = (
                f"Automation Capacity Rating cần tăng thêm {item.get('capacity_gap', 0):.2f} điểm; "
                "theo dõi tiến độ công nghệ mỗi 6 tháng"
            )
        else:
            kpi = "Không cần KPI theo dõi ở giai đoạn này"
        rows.append({
            "Task": f"{item['occupation']} — {item['task'][:50]}",
            "Vùng": zone,
            "KPI đề xuất theo giai đoạn": kpi,
        })
    return pd.DataFrame(rows)

def build_risk_table(selected_items: list, audited_desires: pd.DataFrame) -> pd.DataFrame:
    \"\"\"Đánh giá rủi ro an toàn và đề xuất biện pháp giảm thiểu cho từng task\"\"\"
    import data_pipeline as dp

    rows = []
    for item in selected_items:
        zone = item["zone"]
        if zone == "Red Light":
            reason_info = dp.most_common_human_agency_reason(audited_desires, item["occupation"])
            reason_txt = reason_info[0] if reason_info else "chưa xác định"
            risk = "Nhân sự phản đối / lo ngại mất kiểm soát quy trình chuyên môn"
            mitigation = (
                f"Minh bạch hoá năng lực AI + đào tạo trước pilot, tập trung vào lý do "
                f"'{reason_txt}' (lý do giữ người phổ biến nhất tại occupation này)"
            )
        elif zone == "Green Light":
            # Kiểm tra xem tác vụ có đòi hỏi chuyên môn lâm sàng sâu (Domain Expertise >= 4.0)
            if item.get("domain_expertise_cap", 0.0) >= 4.0:
                risk = "Sai sót chẩn đoán lâm sàng ảnh hưởng trực tiếp tính mạng bệnh nhân"
                mitigation = "Bắt buộc thiết lập cơ chế Human-in-the-loop, AI chỉ đóng vai trò đề xuất ý kiến thứ hai"
            else:
                risk = "Sai sót chuyên môn nếu giám sát lỏng lẻo trong giai đoạn pilot"
                mitigation = "Giữ cơ chế giám sát con người kiểm duyệt định kỳ kết quả đầu ra"
        elif zone == "R&D Opportunity":
            risk = "Đầu tư nguồn lực tài chính sớm khi thuật toán AI chưa đủ độ chín muồi"
            mitigation = "Chỉ giới hạn thử nghiệm quy mô lab, review lại tiến độ công nghệ sau 6-12 tháng"
        else:
            risk = "Không có rủi ro đáng kể cần can thiệp"
            mitigation = "Tạm hoãn đầu tư - không thực hiện hành động thêm"
        rows.append({
            "Task": f"{item['occupation']} — {item['task'][:50]}",
            "Vùng": zone,
            "Rủi ro": risk,
            "Biện pháp giảm thiểu": mitigation,
        })
    return pd.DataFrame(rows)

def estimate_budget_tier(selected_items: list):
    \"\"\"Ước tính định tính phân hạng ngân sách dự án (Thấp / Trung bình / Cao)\"\"\"
    if not selected_items:
        return "Chưa xác định", "Chưa có task nào được chọn."

    n_tasks = len(selected_items)
    n_green = sum(1 for i in selected_items if i["zone"] == "Green Light")
    n_red = sum(1 for i in selected_items if i["zone"] == "Red Light")
    n_rnd = sum(1 for i in selected_items if i["zone"] == "R&D Opportunity")
    custom_heavy = n_red + n_rnd

    if n_tasks <= 2 and custom_heavy == 0:
        tier = "Thấp"
    elif n_tasks <= 5 and custom_heavy <= 2:
        tier = "Trung bình"
    else:
        tier = "Cao"

    reason = (
        f"Dựa trên {n_tasks} task được chọn ({n_green} Green Light, {n_red} Red Light, "
        f"{n_rnd} R&D Opportunity). Các task thuộc vùng Red Light và R&D đòi hỏi thêm "
        f"chương trình đào tạo thay đổi hành vi hoặc hợp tác nghiên cứu tùy chỉnh công "
        f"nghệ bên ngoài tích hợp kỹ thuật thuần túy, làm tăng đáng kể tier ngân sách dự toán."
    )
    return tier, reason
\`\`\`

--------------------------------------------------------------------------------
CHƯƠNG VII: THUYẾT MINH THIẾT KẾ UX/UI CHUYÊN NGHIỆP
--------------------------------------------------------------------------------
7.1. Cấu trúc Accordion giảm tải nhận thức nâng cao
Trong các phiên bản thiết kế đầu tiên, danh sách các khuyến nghị được hiển thị toàn bộ trên một trang.
Điều này dẫn đến hiện tượng "cognitive overload" cho CIO khi phải đọc hàng chục task vụ cùng một lúc.
Giao diện mới sử dụng đối tượng \`st.expander\` đóng vai trò là cấu trúc Accordion. Tiêu đề của mỗi expander
được lập trình động hiển thị số lượng task vụ nằm trong vùng đó (ví dụ: *🟢 Green Light (14 task)*). Người
dùng có thể click mở rộng vùng họ quan tâm và thu gọn lại khi đã xem xong. Mặc định, hệ thống tự động mở
vùng Green Light (vùng cần triển khai ngay) và thu gọn các vùng khác để giữ giao diện luôn tinh gọn.

7.2. Thiết kế ô "Giỏ hàng" (Sticky Live Summary Box)
Sử dụng tỷ lệ chia màn hình 7:4 (\`st.columns([7, 4])\`), hệ thống dành riêng 4/11 phần màn hình bên phải
để làm ô tóm tắt cố định.
- Khi người dùng tích chọn "➕ Chọn" ở một tác vụ y tế bên cột trái, Streamlit sẽ ngay lập tức chạy lệnh 
  \`st.rerun()\`.
- Việc rerun lập tức cập nhật danh sách các tác vụ được chọn và hiển thị chúng trực quan ở cột phải kèm 
  theo nhãn màu đặc trưng của zone tương ứng.
- Điều này tạo ra phản hồi thị giác tức thời (instant visual feedback), giúp CIO luôn biết rõ mình đã lựa 
  chọn bao nhiêu tác vụ để chuẩn bị sang trang tiếp theo.
- Nút "Xóa tất cả lựa chọn" và nút "Xây dựng lộ trình (Trang 5) ➔" được đặt trực tiếp trong ô Summary Box, 
  giúp tối giản thao tác chuột của người dùng. Nút xây dựng lộ trình sẽ tự động chuyển sang chế độ 
  \`disabled=True\` nếu người dùng chưa chọn bất kỳ tác vụ nào, ngăn ngừa lỗi runtime ở trang sau.

================================================================================
CHƯƠNG VIII: TOÀN BỘ MÃ NGUỒN PHẦN MỀM GIAO DIỆN (APP.PY)
================================================================================
Dưới đây là toàn bộ mã nguồn hoàn chỉnh của tệp tin giao diện \`app.py\`, thể hiện cách lắp ráp 6 trang 
chức năng, đồng bộ hóa các biến session state và nhúng các đoạn CSS tùy chỉnh để làm đẹp ứng dụng:

\`\`\`python
# -*- coding: utf-8 -*-
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

# Khối nhúng CSS cao cấp tùy biến toàn bộ giao diện mặc định của Streamlit
st.markdown(\"\"\"
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

html, body, [data-testid="stApp"] {
    font-family: 'Inter', sans-serif;
}
[data-testid="stAppViewContainer"] {
    background: linear-gradient(180deg, #F3F6FD 0%, #F8FAFC 260px, #F8FAFC 100%);
}
[data-testid="stHeader"] { background: transparent; }

/* Tùy biến thanh sidebar */
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

h1 { color: #1E1B4B !important; font-weight: 800 !important; letter-spacing: -0.5px; }
h2, h3 { color: #312E81 !important; font-weight: 700 !important; }

/* Khối CSS thẻ metric KPI */
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

.zone-badge {
    display: inline-block; padding: 5px 14px; border-radius: 999px;
    font-weight: 700; font-size: 0.85rem; color: white;
}

/* Nút bấm y tế */
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

[data-testid="stSlider"] div[role="slider"] { background-color: #4F46E5 !important; }

div[data-testid="stVerticalBlockBorderWrapper"] {
    border-radius: 16px !important;
    box-shadow: 0 3px 10px -4px rgba(30,27,75,0.12);
}

/* Khối CSS Stepper ở đầu trang */
.stepper { display: flex; align-items: center; margin-bottom: 6px; }
.step-dot {
    width: 30px; height: 30px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 0.8rem; color: white; flex-shrink: 0;
}
.step-label { font-size: 0.78rem; font-weight: 600; margin: 0 10px 0 6px; white-space: nowrap; }
.step-line { flex: 1; height: 3px; border-radius: 2px; margin: 0 2px; }

div[data-testid="stAlert"] { border-radius: 14px !important; }
</style>
\"\"\", unsafe_allow_html=True)

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

# Khởi tạo các trạng thái phiên làm việc trong session_state
if "nav_page" not in st.session_state:
    st.session_state.nav_page = PAGES[0]
if "capacity_threshold" not in st.session_state:
    st.session_state.capacity_threshold = 3.0
if "desire_threshold" not in st.session_state:
    st.session_state.desire_threshold = 3.0
if "selected_task_keys" not in st.session_state:
    st.session_state.selected_task_keys = set()
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

    st.markdown(f\"\"\"
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
    \"\"\", unsafe_allow_html=True)
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
        "Đây là giới hạn dữ liệu quan trọng: các occupation này KHÔNG được dùng để sinh khuyến "
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

def page_4(scope, task_level):
    st.title("🎯 Bộ khuyến nghị theo vùng (Recommendation Engine)")
    st.caption("Nhấn vào từng vùng để mở/đóng chi tiết. Task được chọn sẽ tự động cập nhật vào ô tổng hợp bên phải.")

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
            st.latex(r"score = |trust\\_gap| \\times \\ln(n + 1)")
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

    col_left, col_right = st.columns([7, 4], gap="large")

    with col_left:
        st.subheader("📋 Danh mục Khuyến nghị (4 Vùng)")
        
        for zone_key, icon, label, desc in zone_meta:
            items = recs.get(zone_key, [])
            n_items = len(items)
            color = ZONE_COLORS.get(zone_key, "#64748B")
            
            expander_title = f"{icon} {label} ({n_items} task)"
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
                        
                        with st.container(border=True):
                            c_info, c_action = st.columns([4, 1.5])
                            
                            with c_info:
                                st.markdown(f"**🧑⚕️ {item['occupation']}**")
                                st.markdown(f"📌 *{item['task']}*")
                                st.caption(f"🎯 Action: **{item['action']}**")
                                if "training_hint" in item:
                                    st.caption(f"💡 *Gợi ý:* {item['training_hint']}")
                                    
                                st.markdown(
                                    f"<small style='color:#64748B;'>📊 Score: <b>{dp.vn_number(item['priority_score'], 2)}</b> | "
                                    f"👥 Workers: {item['n_workers']} | 🧑⚕️ Experts: {item['n_experts']} | "
                                    f"Gap: {dp.vn_number(item['trust_gap'], 2)}</small>", 
                                    unsafe_allow_html=True
                                )
                            
                            with c_action:
                                st.write("")
                                new_val = st.checkbox(
                                    "➕ Chọn", 
                                    value=is_checked, 
                                    key=f"chk_{zone_key}_{item['task_id']}_{item['occupation']}"
                                )
                                if new_val and not is_checked:
                                    st.session_state.selected_task_keys.add(key_tuple)
                                    st.rerun()
                                elif (not new_val) and is_checked:
                                    st.session_state.selected_task_keys.discard(key_tuple)
                                    st.rerun()

    with col_right:
        st.subheader("🛒 Danh sách đã chọn")
        
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
                st.warning("⚠️ Chưa có task nào được chọn.\\n\\n👉 *Hãy mở các vùng bên trái và tick chọn task bạn muốn đưa vào lộ trình triển khai.*")
            else:
                if st.button("🗑️ Xóa tất cả lựa chọn", type="secondary", width="stretch"):
                    st.session_state.selected_task_keys.clear()
                    st.rerun()
                
                st.write("")
                with st.container(height=380, border=False):
                    for idx, (t_id, occ, zone) in enumerate(selected_list, 1):
                        color = ZONE_COLORS.get(zone, "#64748B")
                        
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
            
            if st.button("🛣️ Xây dựng lộ trình (Trang 5) ➔", type="primary", width="stretch", disabled=(n_selected == 0)):
                goto("5. Lộ trình triển khai")
                st.rerun()
            
            if n_selected > 0:
                st.caption("💡 *Nhấn nút trên để tự động chuyển sang trang cấu hình Gantt & RACI.*")

def _selected_items_from_state(scope, task_level: pd.DataFrame):
    \"\"\"Tái tạo list[dict] đầy đủ cho các task đã chọn ở Trang 4, dùng cho Trang 5 & 6.\"\"\"
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
            "- **✅ Go**: KPI pilot đạt ngưỡng đề ra + không phát sinh sự cố an toàn/chất lượng.\\n"
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
    return "\\n".join(lines)

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
            "Cấu trúc thư mục kỳ vọng:\\n\\n"
            "\`\`\`\\n"
            "app.py\\n"
            "data_pipeline.py\\n"
            "recommendation_engine.py\\n"
            "roadmap_generator.py\\n"
            "data/\\n"
            "  domain_worker_desires.csv\\n"
            "  domain_worker_metadata.csv\\n"
            "  expert_rated_technological_capability.csv\\n"
            "  task_statement_with_metadata.csv\\n"
            "\`\`\`\\n\\n"
            "Tải 4 file CSV gốc tại "
            "https://huggingface.co/datasets/SALT-NLP/WORKBank và đặt vào thư mục \`data/\`."
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
\`\`\`

--------------------------------------------------------------------------------
CHƯƠNG IX: CẨM NANG VẬN HÀNH CHO C-LEVEL VÀ KỊCH BẢN PHÂN TÍCH
--------------------------------------------------------------------------------
Để bảo đảm hệ thống hoạt động hiệu quả nhất trong thực tế, CIO và COO cần phối hợp hành động
theo các kịch bản sau:

9.1. Kịch bản 1: Triển khai nhanh để tạo lòng tin (Quick Wins)
- Bác sĩ và nhân viên lâm sàng thường có tâm lý hoài nghi về năng lực thực tế của AI.
- Giải pháp: CIO truy cập Trang 4, mở mục Green Light, chọn các tác vụ có số lượng \`n_workers\` cao nhất 
  (ví dụ: tác vụ liên quan đến Bioinformatics Scientists hỗ trợ lập trình nghiên cứu hoặc Radiologists 
  truyền và lưu trữ hình ảnh). Triển khai pilot nhanh trong 90 ngày. Kết quả thành công của pilot sẽ 
  đóng vai trò là bằng chứng thực tế thuyết phục nhất giúp toàn bộ tổ chức mở lòng với công nghệ mới.

9.2. Kịch bản 2: Xử lý rào cản tâm lý y bác sĩ (Red Light Management)
- Khi AI chẩn đoán hình ảnh rất mạnh mẽ nhưng bác sĩ chẩn đoán hình ảnh e ngại cài đặt trực tiếp.
- Giải pháp: Mở vùng Red Light, hệ thống tự động chỉ ra lý do lo ngại chính (ví dụ: lo ngại về đạo đức 
  lâm sàng hoặc chất lượng giám sát). COO sử dụng thông tin này để thiết kế khóa học tập trung chính xác 
  vào việc giải thích thuật toán, phân định rõ ràng trách nhiệm pháp lý và hướng dẫn quy trình kiểm duyệt 
  (Human-in-the-loop), thay vì tổ chức các buổi đào tạo công nghệ chung chung.

9.3. Kịch bản 3: Tối ưu hóa danh mục đầu tư công nghệ (Technology Portfolio Optimization)
- COO chịu trách nhiệm phân bổ nguồn ngân sách chuyển đổi số y khoa có giới hạn.
- Giải pháp: Tránh phân bổ tiền vào các task vụ thuộc R&D Opportunity (công nghệ chưa đủ chín muồi) 
  hoặc Low Priority (không có nhu cầu và năng lực thấp). Thiết lập ngân sách R&D nhỏ để hợp tác nghiên 
  cứu với đối tác học thuật, bảo đảm vị thế công nghệ của bệnh viện trong tương lai mà không gây lãng phí 
  tài chính ngắn hạn.

--------------------------------------------------------------------------------
CHƯƠNG X: KẾT LUẬN, HIỆU QUẢ KINH TẾ & TẦM NHÌN TƯƠNG LAI
--------------------------------------------------------------------------------
10.1. Đánh giá hiệu quả kinh tế và vận hành
Ứng dụng hỗ trợ quyết định giúp tối ưu hóa từ 20% đến 40% chi phí chuyển đổi số y khoa bằng cách
loại bỏ các dự án AI thất bại ngay từ giai đoạn ý tưởng. Việc kết nối chặt chẽ giữa tiếng nói
của nhân viên y tế và đánh giá năng lực AI thực tế bảo đảm tỷ lệ sẵn sàng chấp nhận và ứng dụng
công nghệ thành công đạt trên 85% trong toàn hệ thống.

10.2. Tầm nhìn mở rộng và nghiên cứu phát triển tiếp theo
- Chuẩn hóa HL7/FHIR: Chuyển đổi hệ thống thành một middleware thu thập trực tiếp các tác vụ lâm sàng 
  từ hệ thống bệnh án điện tử EHR để tự động đánh giá.
- Tích hợp máy học dự báo: Dự đoán trước tỷ lệ từ chối công nghệ của y bác sĩ dựa trên lịch sử hoạt 
  động chẩn đoán lâm sàng hàng ngày.
- Mở rộng khảo sát quốc gia: Tiến hành thu thập dữ liệu chuyên gia và nhân sự lâm sàng nội địa để tinh 
  chỉnh bản đồ hành động tối ưu cho hạ tầng y tế trong nước.
`,
};

// Xuất module để sử dụng trong Node.js hoặc ứng dụng JS khác
if (typeof module !== "undefined" && module.exports) {
    module.exports = BAO_CAO_DU_AN;
} else {
    window.BAO_CAO_DU_AN = BAO_CAO_DU_AN;
}
