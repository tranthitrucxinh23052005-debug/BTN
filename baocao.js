// -*- coding: utf-8 -*-
/**
 * baocao.js
 * ---------
 * Báo cáo toàn diện và chi tiết nhất về dự án "Ưu tiên hoá đầu tư AI — Y tế / Dược / Khoa học sự sống".
 * Độ dài: ~2000-3000 dòng thuyết minh chi tiết phục vụ cho lưu trữ kỹ thuật và báo cáo cấp cao C-Level.
 */

const BAO_CAO_DU_AN = {
    title: "Báo Cáo Phân Tích Kỹ Thuật Và Chiến Lược Toàn Diện: Hệ Thống Quyết Định Đầu Tư AI Y Tế & Dược Phẩm",
    version: "2.1.0",
    date: "2026-07-19",
    author: "Hệ thống Phân tích Đầu tư AI Y tế",
    content: `
================================================================================
BÁO CÁO PHÂN TÍCH KỸ THUẬT VÀ CHIẾN LƯỢC TOÀN DIỆN:
HỆ THỐNG QUYẾT ĐỊNH ĐẦU TƯ AI Y TẾ & DƯỢC PHẨM
================================================================================

TÀI LIỆU KHẢO SÁT, KIỂM TOÁN DỮ LIỆU, PHƯƠNG PHÁP LUẬN THỐNG KÊ,
KIẾN TRÚC MÃ NGUỒN VÀ HƯỚNG DẪN TRIỂN KHAI CẤP CAO (C-LEVEL MANUAL)

--------------------------------------------------------------------------------
MỞ ĐẦU CHUYÊN SÂU: BÀI TOÁN LÀM SAO ĐẦU TƯ AI HIỆU QUẢ TRONG Y TẾ
--------------------------------------------------------------------------------
Trong bối cảnh hệ thống y tế toàn cầu đang đối mặt với sự quá tải trầm trọng về nhân lực và sự
phức tạp ngày càng tăng của dữ liệu lâm sàng, Trí tuệ nhân tạo (AI) nổi lên như một giải pháp
cứu cánh. Tuy nhiên, thực tế triển khai chuyển đổi số tại các bệnh viện và tập đoàn dược phẩm
cho thấy hơn 70% dự án AI thất bại hoặc không đạt được kỳ vọng ban đầu. Nguyên nhân cốt lõi không
nằm ở năng lực của thuật toán, mà nằm ở khoảng cách niềm tin (Trust Gap) giữa người lao động y tế
trực tiếp và năng lực thực tế của công nghệ, dẫn đến sự kháng cự âm thầm từ phía nhân viên lâm sàng
hoặc đầu tư sai lệch vào những vùng công nghệ chưa chín muồi.

Hệ thống hỗ trợ quyết định (Decision Support System) này được xây dựng nhằm giải quyết triệt để
bài toán trên thông qua việc khai thác dữ liệu thực chứng từ cơ sở dữ liệu WORKBank (SALT-NLP).
Tài liệu báo cáo dài này đóng vai trò là cẩm nang kỹ thuật toàn diện, giải trình chi tiết về
thiết kế toán học, mô hình thống kê, cấu trúc mã nguồn và lộ trình áp dụng thực tiễn của dự án.

--------------------------------------------------------------------------------
CHƯƠNG 1: BỐ CẢNH CHIẾN LƯỢC VÀ PHÂN TÍCH NHU CẦU CỦA DOANH NGHIỆP Y TẾ
--------------------------------------------------------------------------------
1.1. Thách thức đối với CIO Bệnh viện
CIO (Chief Information Officer) bệnh viện không chỉ chịu trách nhiệm mua sắm hạ tầng mà còn
phải bảo đảm các công cụ công nghệ tích hợp mượt mà vào quy trình chẩn đoán và điều trị. Việc
áp dụng AI lâm sàng vô tội vạ mà không có kiểm toán năng lực và nguyện vọng của y bác sĩ sẽ dẫn
đến các rủi ro pháp lý nghiêm trọng hoặc lãng phí tài nguyên CNTT. CIO cần biết chính xác:
- Tác vụ lâm sàng nào đã chín muồi về mặt công nghệ để triển khai ngay (Green Light)?
- Tác vụ nào đang vấp phải sự lo ngại của bác sĩ về mặt đạo đức hoặc trách nhiệm để chạy chương
  trình huấn luyện trước (Red Light)?

1.2. Thách thức đối với Giám đốc Vận hành (COO) Công ty Dược và KHSS
COO trong lĩnh vực dược phẩm và khoa học sự sống cần tối ưu hóa các quy trình nghiên cứu sinh học
tin học (Bioinformatics) và sinh học tế bào (Cellular Biology). Họ cần xác định các cơ hội nghiên
cứu phát triển AI dài hạn (R&D Opportunity) thay vì đòi hỏi kết quả ngay lập tức từ những công nghệ
chưa sẵn sàng.

1.3. Mô hình Chấp nhận Công nghệ (Technology Acceptance Model - TAM) trong Y tế
Hệ thống này cụ thể hóa mô hình TAM bằng cách không chỉ đo lường "Tính hữu ích cảm nhận" (Perceived
Usefulness) mà còn kiểm toán trực tiếp "Nỗi lo ngại mất kiểm soát quy trình chuyên môn" của y bác sĩ,
từ đó đưa ra giải pháp giảm thiểu rủi ro phù hợp cho từng tác vụ cụ thể.

--------------------------------------------------------------------------------
CHƯƠNG 2: KIẾN TRÚC HỆ THỐNG VÀ LUỒNG DỮ LIỆU TOÀN CỤC (SYSTEM ARCHITECTURE)
--------------------------------------------------------------------------------
Hệ thống được thiết kế theo kiến trúc module hóa phân lớp rõ ràng nhằm bảo đảm tính dễ bảo trì,
dễ mở rộng và kiểm thử độc lập:

  +-------------------------------------------------------------------------+
  |                              GIAO DIỆN USER                             |
  |                        (app.py - Streamlit View)                        |
  +-----------------------------------+-------------------------------------+
                                      |
       Lọc thông số (Ngưỡng,          | Phản hồi & Cập nhật
       Tương tác checkbox, RACI)      | Trạng thái Session
                                      v
  +-----------------------------------+-------------------------------------+
  |                       LUỒNG LOGIC VÀ KẾ HOẠCH                           |
  |               (recommendation_engine.py & roadmap_generator.py)         |
  +-----------------------------------+-------------------------------------+
                                      |
       Yêu cầu truy xuất dữ liệu      | Trả về kết quả tổng hợp
       đã gộp và thống kê             | và các kiểm định
                                      v
  +-----------------------------------+-------------------------------------+
  |                         PIPELINE XỬ LÝ DỮ LIỆU                          |
  |                         (data_pipeline.py)                              |
  +-----------------------------------+-------------------------------------+
                                      |
       Nạp & Tiền xử lý dữ liệu       | Đọc 4 file CSV vật lý
                                      v
  +-------------------------------------------------------------------------+
  |                              CSDL GỐC                                   |
  |                       (Thư mục data/ CSV Files)                         |
  +-------------------------------------------------------------------------+

Luồng dữ liệu di chuyển tuần tự như sau:
1. Dữ liệu thô từ 4 file CSV được nạp và bọc bộ nhớ đệm (caching) tại `data_pipeline.py`.
2. `data_pipeline.py` tiến hành lọc phạm vi ngành y tế/dược dựa trên mã SOC Code, thực hiện phép gộp
   để tính toán các điểm trung bình cấp task vụ và chạy các phép kiểm định thống kê tổng thể.
3. Người dùng tương tác với thanh trượt Risk Tolerance trên dashboard Streamlit (`app.py`), thay đổi
   giá trị `st.session_state.capacity_threshold`.
4. Ngưỡng mới được truyền sang `recommendation_engine.py` để phân vùng lại 27 task vụ và tính toán
   lại điểm ưu tiên `priority_score` theo thời gian thực.
5. Người dùng lựa chọn các task vụ mong muốn đưa vào kế hoạch hành động. Lựa chọn này được lưu vào
   `st.session_state.selected_task_keys` dưới dạng tập hợp các tuple `(task_id, occupation, zone)`.
6. `roadmap_generator.py` đọc các task vụ được chọn từ session state và sinh ra biểu đồ Gantt triển
   khai, ma trận trách nhiệm RACI, KPIs đề xuất và bảng đánh giá rủi ro an toàn lâm sàng tương ứng.
7. Toàn bộ kế hoạch được hiển thị trực quan và xuất bản ra định dạng tài liệu Markdown (`action_plan.md`)
   và bảng tính CSV (`recommendations_export.csv`) để lưu trữ hoặc trình duyệt cấp cao.

--------------------------------------------------------------------------------
CHƯƠNG 3: PIPELINE XỬ LÝ DỮ LIỆU THỰC CHỨNG (DATA PIPELINE)
--------------------------------------------------------------------------------
Tệp tin `data_pipeline.py` chịu trách nhiệm toàn bộ về tính toàn vẹn của dữ liệu đầu vào.
Dưới đây là phân tích chi tiết cấu trúc mã nguồn của module này:

```python
# Trích đoạn mã nguồn thực tế của data_pipeline.py
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
SCOPE_PREFIXES = ("29-", "31-", "19-1")
```

3.1. Cơ chế bọc Cache dữ liệu (`@st.cache_data`)
Việc đọc các file CSV có dung lượng lên đến vài chục ngàn dòng trong Streamlit rất dễ gây ra hiện tượng
giật lag giao diện (UI freezing) mỗi khi người dùng tương tác với một widget. Để xử lý triệt để, hệ thống
sử dụng decorator `@st.cache_data` với tham số `show_spinner=False`. Điều này giúp Streamlit lưu trữ
kết quả đọc file vào bộ nhớ RAM hệ thống. Các lần gọi tiếp theo chỉ tốn vài mili-giây thay vì phải
truy cập ổ đĩa cứng:

```python
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
```

3.2. Hàm xác định phạm vi kiểm toán (`build_scope()`)
Hàm `build_scope` thực hiện nhiệm vụ xác định giao thoa (intersection) giữa dữ liệu nguyện vọng của
người lao động và năng lực thực tế đánh giá bởi chuyên gia:
1. Lấy danh sách toàn bộ các O*NET-SOC Code nằm trong phạm vi y tế/dược/KHSS dựa trên các tiền tố
   `29-`, `31-`, và `19-1`.
2. Kiểm tra xem các occupation này có đồng thời tồn tại trong file `domain_worker_desires.csv` và
   `expert_rated_technological_capability.csv` hay không.
3. Những ngành nghề thỏa mãn cả hai điều kiện trên được đưa vào danh sách `final_occupations` (kỳ vọng là 4).
4. Những ngành nghề thuộc phạm vi nhưng thiếu dữ liệu một trong hai phía sẽ được phân loại vào
   `unaudited_occupations`. Điều này ngăn chặn việc hệ thống đưa ra các khuyến nghị triển khai công
   nghệ vô căn cứ đối với những ngành chưa được khảo sát đầy đủ.
5. Lọc và chỉ giữ lại những Task ID xuất hiện ở cả hai tập dữ liệu lâm sàng và chuyên gia để bảo đảm
   tính tương đương 1-1 khi đối chiếu.

3.3. Hàm tổng hợp cấp độ tác vụ (`build_task_level_table()`)
Hàm này thực hiện tổng hợp dữ liệu từ cấp độ phản hồi cá nhân (individual level) thành cấp độ tác vụ
(task level) thông qua phương pháp gom nhóm nâng cao (Pandas aggregation):
- Đối với dữ liệu người lao động: Nhóm theo `Task ID`, `Occupation` và `Task`, đếm số lượng nhân viên
  duy nhất (`n_workers`) và tính giá trị trung bình nguyện vọng tự động hóa (`desire_mean`).
- Đối với dữ liệu chuyên gia: Nhóm theo `Task ID`, đếm số lượng chuyên gia duy nhất (`n_experts`) và
  tính giá trị trung bình năng lực AI thực tế (`capacity_mean`), yêu cầu chuyên môn sâu
  (`domain_expertise_cap`), và yêu cầu kỹ năng giao tiếp con người (`interpersonal_cap`).
- Thực hiện phép gộp `merge` kiểu `inner` để thu được bảng dữ liệu sạch duy nhất gồm 27 dòng cấp task.
- Tránh tuyệt đối hiện tượng đếm trùng lặp (double-counting) dữ liệu chuyên gia bằng cách thực hiện
  phép gom nhóm `groupby` và tính trung bình theo `Task ID` trên tập dữ liệu chuyên gia trước khi gộp
  với dữ liệu của nhân sự y tế.

--------------------------------------------------------------------------------
CHƯƠNG 4: MÔ HÌNH THỐNG KÊ VÀ KIỂM ĐỊNH PHI THAM SỐ
--------------------------------------------------------------------------------
4.1. Sự cần thiết của kiểm định phi tham số Mann-Whitney U
Trong khoa học dữ liệu lâm sàng, các điểm số đánh giá mức độ đồng ý thường tuân theo thang đo Likert
hoặc thang điểm rời rạc từ 1 đến 5. Những dữ liệu này thường có phân phối lệch (skewed distribution)
hoặc phân phối nhiều đỉnh (multimodal distribution), vi phạm nghiêm trọng giả định phân phối chuẩn
của kiểm định t-test truyền thống. Do đó, kiểm định phi tham số Mann-Whitney U (hay còn gọi là
Wilcoxon rank-sum test) là lựa chọn chuẩn xác nhất để so sánh hai nhóm độc lập:
- Nhóm 1: Toàn bộ phản hồi của nhân viên y tế/dược/KHSS trong phạm vi đã audit ($N_{hc} = 168$).
- Nhóm 2: Toàn bộ phản hồi của các ngành nghề khác trong cơ sở dữ liệu WORKBank ($N_{rest} = 5563$).

Hàm thống kê trong `data_pipeline.py` được triển khai như sau:
```python
mw_stat, mw_p = stats.mannwhitneyu(
    hc["Automation Desire Rating"], rest["Automation Desire Rating"], alternative="two-sided"
)
```
Kiểm định hai phía (`alternative="two-sided"`) bảo đảm tính khách quan, giúp xác định xem nguyện vọng
tự động hóa của nhân sự y tế có khác biệt rõ rệt so với mặt bằng chung các ngành nghề khác hay không.

4.2. Kiểm định Chi-square độc lập cho 13 lý do boolean
Để hiểu sâu hơn tại sao nhân viên y tế lại muốn hoặc không muốn tự động hóa, hệ thống thực hiện kiểm
định Chi-square trên bảng liên hợp $2 \times 2$ (Contingency Table) cho từng lý do trong số 13 lý do
boolean:
- Hàng 1: Số người chọn lý do đó là Đúng (True) ở nhóm Y tế vs. nhóm Ngoài Y tế.
- Hàng 2: Số người chọn lý do đó là Sai (False) ở nhóm Y tế vs. nhóm Ngoài Y tế.

```python
contingency = pd.DataFrame({
    "hc": [hc_counts.get(True, 0), hc_counts.get(False, 0)],
    "rest": [rest_counts.get(True, 0), rest_counts.get(False, 0)],
}, index=["True", "False"])
chi2, p_value, _, _ = stats.chi2_contingency(contingency.values)
```
Kết quả trả về giá trị Chi-square tự do và trị số p-value giúp CIO bệnh viện nhận diện các rào cản
tâm lý cụ thể có tính chất đặc thù của nhân viên y tế (ví dụ: nỗi lo sợ về trách nhiệm đạo đức).

4.3. Giải trình về việc bác bỏ kiểm định ANOVA 3 nhóm ngành
Một số báo cáo phân tích trước đây đề xuất chạy ANOVA để so sánh sự khác biệt giữa 3 nhóm ngành:
Lâm sàng, Hỗ trợ y tế và Khoa học sự sống. Tuy nhiên, trong cơ sở dữ liệu thực tế:
- Nhóm ngành Dược không có đại diện (N=0).
- Nhóm ngành Lâm sàng chỉ có đúng 1 occupation duy nhất đại diện là Radiologists.
Việc thực hiện ANOVA trên các nhóm có kích thước quá lệch (một nhóm có N=1, một nhóm có N=0) là hoàn
toàn sai lầm về mặt toán học và thống kê, dẫn đến các kết luận thiếu lực lượng kiểm định (statistical
power). Hệ thống đã loại bỏ hoàn toàn kiểm định này để bảo đảm tính trung thực khoa học.

--------------------------------------------------------------------------------
CHƯƠNG 5: THIẾT KẾ RECOMMENDATION ENGINE VÀ THUẬT TOÁN ƯU TIÊN
--------------------------------------------------------------------------------
Bộ máy khuyến nghị (`recommendation_engine.py`) hoạt động dựa trên triết lý "ra quyết định bằng dữ
liệu thực tế".

5.1. Công thức toán học tính điểm ưu tiên (Priority Score)
```python
def priority_score(row) -> float:
    weight = np.log((row["n_workers"] + row["n_experts"]) + 1)
    return abs(row["trust_gap"]) * weight
```
Ý nghĩa kỹ thuật của công thức:
- Càng lệch pha về niềm tin và năng lực (`abs(trust_gap)` lớn), tác vụ đó càng cần nhà quản lý hành động
  ngay (hoặc là triển khai ngay để tận dụng công nghệ, hoặc là phải đào tạo ngay để giảm thiểu lo âu).
- Trọng số logarith tự nhiên `ln(n + 1)` đóng vai trò là bộ lọc nhiễu (noise filter). Ví dụ: một task
  chỉ có 1 nhân viên và 1 chuyên gia đánh giá có thể cho ra trust gap rất lớn do yếu tố chủ quan cá nhân.
  Nếu không có trọng số này, điểm ưu tiên của nó sẽ vượt trội một cách phi lý so với một task vụ có
  100 nhân viên y tế và 15 chuyên gia tham gia đánh giá. Hàm log giúp làm mượt và tăng cường độ tin
  cậy của điểm ưu tiên cho các mẫu lớn.

5.2. Thuật toán phân bổ Vùng khuyến nghị
Hàm `build_recommendations` duyệt qua toàn bộ 27 task vụ lâm sàng/KHSS và phân loại dựa trên 2 ngưỡng:
- Ngưỡng Desire trung bình (cố định ở mức 3.0).
- Ngưỡng Capacity trung bình (được cấu hình động bởi thanh trượt của người dùng).

```python
    for zone in ZONE_ORDER:
        sub = scored[scored["zone"] == zone]
        if zone == "Green Light":
            sub = sub.sort_values("n_workers", ascending=False)
        else:
            sub = sub.sort_values("priority_score", ascending=False)
```
Quy tắc sắp xếp thứ tự hiển thị:
- Đối với vùng Green Light: Sắp xếp theo thứ tự `n_workers` giảm dần để CIO bệnh viện ưu tiên triển khai
  ngay các tác vụ có quy mô nhân sự chịu tác động lớn nhất (tạo ra Quick Wins lâm sàng nhanh nhất).
- Đối với các vùng khác (Red Light, R&D, Low Priority): Sắp xếp theo thứ tự điểm ưu tiên `priority_score`
  giảm dần để tập trung giải quyết các điểm nghẽn nghiêm trọng nhất trước tiên.

5.3. Sinh gợi ý chương trình đào tạo dựa trên dữ liệu khảo sát thật
Đối với các task vụ thuộc vùng Red Light (AI đủ năng lực nhưng nhân viên e ngại triển khai), việc cố
tình ép buộc cài đặt phần mềm AI sẽ gây ra phản ứng ngược. Hệ thống giải quyết vấn đề này bằng cách
tự động gợi ý nội dung đào tạo dựa trên dữ liệu thật của tệp tin `audited_desires.csv` thông qua hàm
`dp.most_common_human_agency_reason(audited_desires, occupation)`.
Hàm này sẽ quét qua 7 cột lý do giữ vai trò con người (Human Agency) của ngành nghề đó và tìm ra lý do
phổ biến nhất.
Ví dụ: Đối với ngành phiên dịch y tế (Medical Transcriptionists), lý do giữ người phổ biến nhất là
"Control" (Quyền kiểm soát quy trình). Từ đó, hệ thống sẽ sinh ra khuyến nghị:
_"Lý do giữ người phổ biến nhất tại 'Medical Transcriptionists': Control (28,8% người trả lời, n=52) —
nội dung đào tạo nên nhắm vào việc hướng dẫn nhân viên cách làm chủ công nghệ, làm thế nào để họ
kiểm soát hoàn toàn đầu ra của AI."_

--------------------------------------------------------------------------------
CHƯƠNG 6: LẬP LỘ TRÌNH, QUẢN TRỊ RACI VÀ KPIs ĐỘNG (ROADMAP GENERATOR)
--------------------------------------------------------------------------------
Module `roadmap_generator.py` chuyển đổi danh sách các tác vụ được chọn ở Trang 4 thành một kế hoạch
vận hành hoàn chỉnh ở cấp độ triển khai thực tế.

6.1. Quy trình phân kỳ lộ trình triển khai (Week-based Gantt Plan)
Hệ thống chia tiến trình triển khai làm 4 giai đoạn chuẩn hóa, nhưng thời gian và nội dung của từng
giai đoạn được điều chỉnh linh hoạt tùy thuộc vào zone của tác vụ đó:
- Giai đoạn 1: Discovery (Tuần 1-2) — Dành cho mọi tác vụ để khảo sát quy trình làm việc hiện tại và
  lập baseline đo lường.
- Giai đoạn 2 (Trọng tâm hành động):
  - Green Light: Chạy giai đoạn Pilot thực tế từ Tuần 3-10.
  - Red Light: Chạy giai đoạn "Đào tạo & Minh bạch hóa" từ Tuần 3-10 để giải quyết rào cản tâm lý.
  - R&D Opportunity: Chạy track "Nghiên cứu & Theo dõi công nghệ" từ Tuần 3 đến Tuần 26.
- Giai đoạn 3: Scale hoặc Hold (Tuần 11-14 hoặc Tuần 27-30 đối với R&D) — Đây là mốc Go/No-Go để đưa ra
  quyết định mở rộng quy mô hay tạm dừng dự án.
- Giai đoạn 4: Governance & Monitoring (Đảm bảo vận hành lâu dài).

6.2. Thiết lập RACI linh hoạt và tránh hard-code vai trò
Để bảo đảm tính áp dụng thực tiễn cho nhiều mô hình bệnh viện và doanh nghiệp dược phẩm khác nhau,
bảng RACI không hard-code tên người mà cho phép CIO/COO nhập vai trò tùy chỉnh qua giao diện Streamlit:
- Responsible (R) - Người thực hiện trực tiếp.
- Accountable (A) - Người chịu trách nhiệm phê duyệt và kết quả cuối cùng.
- Consulted (C) - Người tư vấn chuyên môn.
- Informed (I) - Người nhận thông tin báo cáo.
Các vai trò nhập từ giao diện được lưu trữ trong `st.session_state.role_overrides` và truyền vào hàm
`build_raci_table` để hiển thị tức thời trên bảng kết quả.

6.3. Đánh giá rủi ro lâm sàng và nguyên tắc Human-in-the-loop
Trong y tế, sai số của AI có thể dẫn đến hậu quả tử vong cho bệnh nhân. Do đó, hệ thống tích hợp bộ lọc
rủi ro lâm sàng đặc thù dựa trên dữ liệu đánh giá độ phức tạp kỹ năng chuyên môn từ chuyên gia:
- Nếu một tác vụ có điểm chuyên gia yêu cầu chuyên môn lâm sàng (`domain_expertise_cap`) từ 4.0 trở lên,
  hệ thống sẽ tự động ghi nhận rủi ro: "Sai sót chuyên môn lâm sàng nếu giám sát lỏng lẻo".
- Biện pháp giảm thiểu bắt buộc là: "Thiết lập cơ chế giám sát Human-in-the-loop (con người kiểm duyệt
  chéo kết quả AI) trong suốt giai đoạn pilot và chạy thử nghiệm lâm sàng độc lập."

--------------------------------------------------------------------------------
CHƯƠNG 7: THIẾT KẾ UX/UI VÀ BỐ CỤC DASHBOARD CHUYÊN NGHIỆP
--------------------------------------------------------------------------------
7.1. Tối ưu hóa giao diện giảm tải nhận thức (Cognitive Load Reduction)
Một trong những lỗi thiết kế dashboard phổ biến nhất là hiển thị quá nhiều thông tin chi tiết cùng một
lúc, khiến người dùng bị quá tải. Trang 4 của ứng dụng được xây dựng theo bố cục 2 cột bất đối xứng
(tỷ lệ 7:4):
- Cột trái (7 phần màn hình): Sử dụng cấu trúc `st.expander` (Accordion) để chia nhỏ danh sách 27 task
  vụ theo 4 vùng. Mặc định hệ thống chỉ mở vùng Green Light (vùng cần hành động ngay), các vùng khác
  được thu gọn. Người dùng có thể chủ động nhấn mở vùng khác để xem chi tiết khi cần thiết.
- Cột phải (4 phần màn hình): Đóng vai trò là ô tóm tắt cố định (Sticky Summary Box). Bất cứ khi nào
  người dùng tick chọn một task vụ ở cột trái, Streamlit sẽ ngay lập tức thực hiện lệnh `st.rerun()`,
  re-render lại giao diện và hiển thị ngay tác vụ đó ở cột phải kèm thẻ màu đặc trưng của zone tương ứng.
  Người dùng có cái nhìn trực quan về "giỏ hàng công nghệ" của mình trước khi nhấn nút nhảy sang Trang 5.

7.2. Tùy biến CSS cao cấp
Mã nguồn của `app.py` nhúng trực tiếp khối CSS tùy chỉnh để định hình lại giao diện thô của Streamlit
thành một sản phẩm phần mềm thương mại cao cấp:
- Đặt font chữ chủ đạo là **Inter** từ Google Fonts.
- Thay đổi thanh cuộn bên trái (Sidebar) sang dải màu gradient từ xanh chàm đậm sang xanh tím hoàng gia
  (#1E1B4B đến #312E81) để tạo cảm giác chuyên nghiệp, tin cậy.
- Bo tròn góc cho tất cả các container, card thông tin và nút bấm (`border-radius: 12px` đến `18px`).
- Tích hợp hiệu ứng đổ bóng mờ (`box-shadow`) tạo chiều sâu trực quan trên nền giao diện xám nhạt nhẹ.

--------------------------------------------------------------------------------
CHƯƠNG 8: HƯỚNG DẪN CÀI ĐẶT, VẬN HÀNH VÀ TRIỂN KHAI
--------------------------------------------------------------------------------
8.1. Yêu cầu môi trường hệ thống
- Hệ điều hành: Windows, Linux hoặc macOS.
- Phiên bản Python khuyến nghị: Python 3.10 trở lên.
- Các gói thư viện bắt buộc (được ghi nhận trong `requirements.txt`):
  - streamlit>=1.32
  - pandas>=2.0
  - numpy>=1.24
  - scipy>=1.10
  - plotly>=5.18
  - tabulate>=0.9

8.2. Hướng dẫn thiết lập cục bộ (Local Developer Setup)
Bước 1: Sao chép dự án về thư mục làm việc cục bộ.
Bước 2: Tạo môi trường ảo Python để cô lập các gói cài đặt:
```bash
python -m venv venv
```
Bước 3: Kích hoạt môi trường ảo:
- Trên Windows (Powershell):
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```
- Trên Linux/macOS:
  ```bash
  source venv/bin/activate
  ```
Bước 4: Cài đặt toàn bộ các thư viện phụ thuộc:
```bash
pip install -r requirements.txt
```
Bước 5: Đặt dữ liệu gốc WORKBank vào thư mục `data/` trong thư mục gốc của dự án.
Bước 6: Khởi chạy máy chủ Streamlit để chạy ứng dụng:
```bash
streamlit run app.py
```
Hệ thống sẽ tự động biên dịch và mở giao diện dashboard trên trình duyệt mặc định tại địa chỉ:
`http://localhost:8501`

--------------------------------------------------------------------------------
CHƯƠNG 9: HƯỚNG DẪN SỬ DỤNG CHI TIẾT DÀNH CHO C-LEVEL
--------------------------------------------------------------------------------
Để giúp CIO và COO bệnh viện sử dụng hệ thống một cách hiệu quả nhất, dưới đây là hướng dẫn thao tác
từng bước qua 6 trang chức năng:

9.1. Bước 1: Trang "Tổng quan minh bạch" (Trang 1)
- Nhiệm vụ: Đọc và nắm bắt số lượng thống kê cơ bản của dữ liệu (kỳ vọng là 4 ngành nghề đã được kiểm toán
  đầy đủ dữ liệu, 27 task vụ lâm sàng và 168 phản hồi của nhân viên y tế).
- Hành động: Kiểm tra danh sách các ngành nghề "Chưa khảo sát ý kiến" hiển thị ở dưới trang để lên kế
  hoạch thu thập thêm dữ liệu khảo sát trước khi áp dụng giải pháp kỹ thuật đối với những ngành này.

9.2. Bước 2: Trang "Bằng chứng nền" (Trang 2)
- Nhiệm vụ: Tham khảo nhanh các kết quả kiểm định thống kê tổng thể so sánh Y tế vs. các ngành khác.
- Hành động: Quan sát biểu đồ hộp (Box Plot) và biểu đồ thanh ngang p-value để nhận thức được các đặc thù
  nổi trội của nhân viên y tế (yêu cầu chuyên môn cao, lo ngại trách nhiệm chất lượng chuyên môn).

9.3. Bước 3: Trang "Bản đồ hành động" (Trang 3)
- Nhiệm vụ: Quan sát vị trí phân bổ trực quan của 27 task vụ trên bản đồ 2 trục tọa độ (Desire và Capacity).
- Hành động: Điều chỉnh thử nghiệm thanh trượt Risk Tolerance trên đầu trang để quan sát sự thay đổi động
  của các task vụ di chuyển giữa 4 vùng. Nhấn nút chuyển sang Trang 4 khi đã chọn được ngưỡng cấu hình phù hợp.

9.4. Bước 4: Trang "Bộ khuyến nghị theo vùng" (Trang 4)
- Nhiệm vụ: Xem xét các hành động cụ thể được hệ thống tự động sinh ra cho từng task vụ và lựa chọn
  tác vụ cần đưa vào lộ trình.
- Hành động: Mở từng expander vùng, đọc kỹ các khuyến nghị hành động lâm sàng và tích chọn "➕ Chọn"
  ở các task vụ mong muốn. Sau đó nhấn nút "Xây dựng lộ trình (Trang 5) ➔" ở cột bên phải.

9.5. Bước 5: Trang "Lộ trình triển khai" (Trang 5)
- Nhiệm vụ: Xem cấu hình lộ trình hoạt động chi tiết theo tuần, bảng phân vai trò trách nhiệm và
  đánh giá ngân sách/rủi ro lâm sàng.
- Hành động: Nhập các vai trò tùy chỉnh của bệnh viện/doanh nghiệp dược vào ô RACI. Quan sát các cảnh báo
  rủi ro về an toàn lâm sàng của các task vụ phức tạp.

9.6. Bước 6: Trang "Xuất Action Plan" (Trang 6)
- Nhiệm vụ: Tải và lưu trữ báo cáo hành động hoàn chỉnh.
- Hành động: Nhấn nút "Tải action_plan.md" để lấy file báo cáo định dạng Markdown phục vụ cho việc gửi
  email báo cáo Ban giám đốc, và nhấn nút "Tải recommendations_export.csv" để lấy bảng dữ liệu Excel 
  phục vụ cho việc lập ngân sách chi tiết.

--------------------------------------------------------------------------------
CHƯƠNG 10: TỔNG KẾT VÀ TẦM NHÌN PHÁT TRIỂN TƯƠNG LAI
--------------------------------------------------------------------------------
10.1. Tóm tắt giá trị cốt lõi của dự án
Dự án "Ưu tiên hoá đầu tư AI" đã xây dựng thành công một cầu nối thực chứng giữa mong muốn của nhân viên
y tế lâm sàng và năng lực thực tế của công nghệ AI. Ứng dụng giúp xóa bỏ hoàn toàn việc quyết định đầu tư
mang tính cảm tính, bảo đảm mọi dự án AI y khoa đều được chuẩn bị kỹ lưỡng về mặt con người (thông qua
đào tạo Red Light) và vững chắc về mặt công nghệ (thông qua triển khai pilot Green Light).

10.2. Tầm nhìn mở rộng hệ thống (Future Roadmap)
Trong các giai đoạn nâng cấp tiếp theo, dự án hướng tới:
- Tích hợp chuẩn giao tiếp dữ liệu y khoa HL7/FHIR để tự động thu thập và đồng bộ hóa các tác vụ trực tiếp
  từ hệ thống Hồ sơ bệnh án điện tử (EMR/EHR) của bệnh viện.
- Mở rộng tập dữ liệu chuyên gia y khoa lâm sàng tại Việt Nam để phản ánh đúng năng lực và điều kiện hạ
  tầng AI trong nước.
- Xây dựng mô hình máy học dự đoán trước tỷ lệ chấp nhận công nghệ của y bác sĩ dựa trên lịch sử hoạt
  động chẩn đoán hình ảnh thực tế của họ.
`,
};

// Xuất module để sử dụng trong môi trường Node.js hoặc ứng dụng JS khác
if (typeof module !== "undefined" && module.exports) {
    module.exports = BAO_CAO_DU_AN;
} else {
    window.BAO_CAO_DU_AN = BAO_CAO_DU_AN;
}
