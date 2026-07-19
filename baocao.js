// -*- coding: utf-8 -*-
/**
 * baocao.js
 * ---------
 * Báo cáo phân tích chuyên sâu về dự án "Ưu tiên hoá đầu tư AI — Y tế / Dược / Khoa học sự sống".
 * Tài liệu này bao gồm phân tích về mã nguồn, ý nghĩa thực tiễn, mô hình thống kê,
 * và các khuyến nghị kinh doanh dành cho CIO bệnh viện, Giám đốc vận hành, và Trưởng phòng chuyển đổi số.
 */

const BAO_CAO_DU_AN = {
    title: "Báo Cáo Phân Tích Chuyên Sâu Dự Án Hệ Thống Hỗ Trợ Quyết Định Đầu Tư AI (Y Tế / Dược / KHSS)",
    version: "1.0.0",
    date: "2026-07-19",
    author: "Hệ thống Phân tích Đầu tư AI Y tế",
    content: `
================================================================================
BÁO CÁO PHÂN TÍCH CHUYÊN SÂU DỰ ÁN HỆ THỐNG HỖ TRỢ QUYẾT ĐỊNH ĐẦU TƯ AI
================================================================================

MỤC LỤC CHI TIẾT:
1. Giới thiệu tổng quan & Mục tiêu dự án
2. Đối tượng thụ hưởng và Câu hỏi cốt lõi
3. Dữ liệu nền tảng & Quy trình tiền xử lý (Data Pipeline)
4. Phương pháp luận Thống kê & Kiểm định (Statistical Methodology)
5. Thiết kế Bộ công cụ Ưu tiên hóa (Recommendation Engine)
6. Lập lộ trình, RACI, KPIs & Đánh giá rủi ro an toàn lâm sàng (Roadmap Generator)
7. Kiến trúc mã nguồn & Ý nghĩa kỹ thuật từng module
8. Giao diện trải nghiệm người dùng & Tương tác thông minh (UX/UI Dashboard)
9. Phân tích kết quả thực tế trên 4 nhóm ngành lâm sàng/KHSS
10. Tổng kết, Ý nghĩa kinh tế và Khuyến nghị chiến lược cho CIO/COO

--------------------------------------------------------------------------------
CHƯƠNG 1: GIỚI THIỆU TỔNG QUAN & MỤC TIÊU DỰ ÁN
--------------------------------------------------------------------------------
Trong kỷ nguyên chuyển đổi số y tế toàn cầu, ứng dụng Trí tuệ nhân tạo (AI) đã chuyển từ
giai đoạn thí điểm công nghệ sang giai đoạn tích hợp hệ thống quy mô lớn. Tuy nhiên, 
các CIO bệnh viện, giám đốc vận hành (COO) công ty dược và trưởng phòng chuyển đổi số 
đang đứng trước một bài toán nan giải: "Nên đầu tư AI vào đâu trước để mang lại giá trị
thực tiễn cao nhất, giảm thiểu tối đa rủi ro an toàn người bệnh và tối ưu hóa chi phí?"

Dự án này được thiết kế nhằm xây dựng một ứng dụng hỗ trợ quyết định (Decision Support System) 
dựa trên dữ liệu thực chứng từ bộ cơ sở dữ liệu khảo sát WORKBank (SALT-NLP). Khác biệt hoàn 
toàn với các báo cáo tư vấn mang tính định tính hay lý thuyết suông, hệ thống này khai thác 
mối liên hệ giữa:
- Automation Desire Rating: Nguyện vọng tự động hóa của người lao động y tế trực tiếp.
- Automation Capacity Rating: Đánh giá năng lực công nghệ thực tế từ các chuyên gia AI.

Mục tiêu tối thượng là lấp đầy "Trust Gap" (Khoảng cách niềm tin) và định vị chính xác 
các cơ hội đầu tư AI thông qua 4 vùng phân loại hành động: Green Light, Red Light, 
R&D Opportunity, và Low Priority.

--------------------------------------------------------------------------------
CHƯƠNG 2: ĐỐI TƯỢNG THỤ HƯỞNG VÀ CÂU HỎI CỐT LÕI
--------------------------------------------------------------------------------
Ứng dụng hướng tới các nhà lãnh đạo cấp cao trong hệ sinh thái chăm sóc sức khỏe, bao gồm:
1. CIO Bệnh viện: Người chịu trách nhiệm về hạ tầng công nghệ và tích hợp hệ thống AI vào 
   quy trình lâm sàng hàng ngày.
2. Giám đốc vận hành (COO) Công ty Dược: Người tối ưu hóa chuỗi cung ứng, nghiên cứu 
   lâm sàng sinh học và vận hành kinh doanh dược phẩm.
3. Trưởng phòng Chuyển đổi số: Người điều phối quy trình đào tạo nhân lực và chuyển giao 
   công nghệ mới.

Hệ thống được thiết kế để trả lời 4 câu hỏi chiến lược theo đúng thứ tự ưu tiên:
- Câu hỏi 1: Nên làm gì trước? (Ưu tiên các task thuộc vùng Green Light và sắp xếp theo quy mô 
  tác động thực tế).
- Câu hỏi 2: Triển khai theo quy trình nào? (Lộ trình chi tiết từng tuần đi kèm tiêu chí go/no-go).
- Câu hỏi 3: Ai làm, đo lường bằng gì, ngân sách và rủi ro ra sao? (Xác lập ma trận trách nhiệm RACI, 
  các chỉ số KPI, dự toán ngân sách định tính và biện pháp giảm thiểu rủi ro lâm sàng).
- Câu hỏi 4: Bằng chứng nào chứng minh khuyến nghị này đáng tin? (Truy vết nguồn gốc số liệu 
  khảo sát và chuyên gia bên dưới thông qua tính năng "Xem bằng chứng" của từng task).

--------------------------------------------------------------------------------
CHƯƠNG 3: DỮ LIỆU NỀN TẢNG & QUY TRÌNH TIỀN XỬ LÝ (DATA PIPELINE)
--------------------------------------------------------------------------------
Hệ thống sử dụng dữ liệu thực từ cuộc khảo sát WORKBank, bao gồm 4 tệp tin CSV cốt lõi:
1. domain_worker_desires.csv: Ghi nhận nguyện vọng tự động hóa và 13 cột lý do của người lao động.
2. domain_worker_metadata.csv: Thông tin nền tảng về nhân khẩu học và nhóm ngành của người lao động.
3. expert_rated_technological_capability.csv: Đánh giá năng lực công nghệ AI trên thang 1-5 từ chuyên gia.
4. task_statement_with_metadata.csv: Danh mục chi tiết các task vụ và mã định danh O*NET-SOC tương ứng.

Quy trình lọc dữ liệu (Data Filtering Pipeline) tuân thủ nghiêm ngặt các mã O*NET-SOC:
- Phân nhóm Lâm sàng trực tiếp: Mã bắt đầu bằng 29- (ví dụ: Radiologists).
- Phân nhóm Hỗ trợ Chăm sóc Sức khỏe: Mã bắt đầu bằng 31- (ví dụ: Medical Transcriptionists).
- Phân nhóm Khoa học Sự sống: Mã bắt đầu bằng 19-1 (ví dụ: Bioinformatics Scientists, Molecular and Cellular Biologists).

Để đảm bảo tính toàn vẹn khoa học, hệ thống thực hiện phép giao (intersection), chỉ giữ lại 
những ngành nghề xuất hiện đồng thời ở cả hai nguồn dữ liệu người lao động và chuyên gia. Kết quả 
lọc thu được chính xác:
- 4 occupations đáp ứng điều kiện: Bioinformatics Scientists, Radiologists, Molecular and Cellular Biologists, và Medical Transcriptionists.
- 27 tasks tương ứng.
- 168 phản hồi người lao động.

--------------------------------------------------------------------------------
CHƯƠNG 4: PHƯƠNG PHÁP LUẬN THỐNG KÊ & KIỂM ĐỊNH (STATISTICAL METHODOLOGY)
--------------------------------------------------------------------------------
Hệ thống áp dụng các nguyên tắc thống kê chuẩn mực để tránh các kết luận sai lệch:
1. Kiểm định phi tham số Mann-Whitney U:
   Dùng để so sánh Automation Desire Rating giữa nhóm ngành Y tế/Dược/KHSS và Phần còn lại của 
   toàn bộ dữ liệu WORKBank. Sự lựa chọn này là tối ưu vì dữ liệu điểm đánh giá không tuân theo 
   phân phối chuẩn (non-normal distribution). Kết quả p-value cho thấy mức độ sẵn sàng tự động hóa 
   tổng thể của nhân sự y tế so với các ngành nghề khác.
2. Kiểm định Chi-square độc lập:
   Thực hiện trên 13 cột lý do boolean (Stress, Human Error, Domain Knowledge, Empathy...) để tìm ra 
   sự khác biệt có ý nghĩa thống kê giữa nhóm Y tế và các ngành khác. Hệ thống làm nổi bật hai lý do 
   cực kỳ đặc thù của y tế là: Domain Knowledge (Kiến thức chuyên môn sâu) và Quality Oversight 
   (Giám sát chất lượng chuyên môn).
3. Ràng buộc thống kê:
   - Tuyệt đối KHÔNG thực hiện ANOVA trên 3 nhóm ngành y tế nhỏ vì cỡ mẫu một số nhóm quá thấp (ví dụ: 
     N=0 cho nhóm Dược riêng biệt), việc chạy ANOVA trong trường hợp này sẽ vi phạm giả định cỡ mẫu.
   - KHÔNG bao giờ ghi nhãn "có ý nghĩa thống kê" trên giao diện khi hiển thị số liệu thống kê 
     cấp task vụ cá lẻ có n < 30. Mọi số liệu hiển thị bắt buộc phải đính kèm cỡ mẫu n tương ứng.

--------------------------------------------------------------------------------
CHƯƠNG 5: THIẾT KẾ BỘ CÔNG CỤ ƯU TIÊN HÓA (RECOMMENDATION ENGINE)
--------------------------------------------------------------------------------
Cốt lõi của Recommendation Engine là công thức tính điểm ưu tiên (Priority Score):
  priority_score = |trust_gap| * ln(n_workers + n_experts + 1)

Trong đó:
- trust_gap = capacity_mean - desire_mean. Khoảng cách này thể hiện sự lệch pha giữa năng lực thực tế 
  của AI và mong muốn của con người. Trị tuyệt đối |trust_gap| được sử dụng vì cả khoảng cách dương 
  (AI đủ năng lực nhưng người lao động chưa sẵn sàng) và khoảng cách âm (người lao động muốn nhưng AI 
  chưa đủ năng lực) đều là các điểm nghẽn nghiêm trọng cần sự can thiệp của nhà quản lý.
- Trọng số logarith tự nhiên ln(n + 1) giúp giảm thiểu sai số do các task vụ có quá ít phản hồi nhưng 
  lại có gap lớn một cách ngẫu nhiên, giúp đưa các tác vụ có cỡ mẫu khảo sát lớn hơn lên thứ tự ưu tiên.

Bảng phân phối 4 Vùng hành động (Zone Mapping):
- Vùng Green Light: Desire >= 3.0 và Capacity >= Ngưỡng cấu hình. Đây là vùng hành động ngay.
- Vùng Red Light: Desire < 3.0 và Capacity >= Ngưỡng cấu hình. Đây là vùng có nguy cơ từ chối công nghệ 
  do rào cản tâm lý hoặc lo ngại của nhân sự lâm sàng. Cần đào tạo và minh bạch trước khi triển khai.
- Vùng R&D Opportunity: Desire >= 3.0 và Capacity < Ngưỡng cấu hình. Đây là các cơ hội nghiên cứu phát 
  triển hoặc liên kết với các viện công nghệ để nâng cao năng lực thuật toán.
- Vùng Low Priority: Cả hai chỉ số đều dưới ngưỡng. Tạm hoãn đầu tư để tiết kiệm nguồn lực.

--------------------------------------------------------------------------------
CHƯƠNG 6: LỘ TRÌNH, RACI, KPIS & ĐÁNH GIÁ RỦI RO LÂM SÀNG
--------------------------------------------------------------------------------
Lộ trình triển khai được thiết lập động theo thời gian thực dựa trên các task được lựa chọn:
1. Mô hình Gantt Chart:
   - Giai đoạn Discovery: 2 tuần đầu dành cho tất cả các task nhằm thiết lập baseline và khảo sát quy trình.
   * Đối với Green Light: Chạy giai đoạn Pilot từ tuần 3-10, sau đó quyết định Scale hoặc Hold ở tuần 11-14.
   * Đối với Red Light: Thay thế Pilot bằng giai đoạn "Đào tạo & Minh bạch hóa" kéo dài từ tuần 3-10.
   * Đối với R&D Opportunity: Chạy track Nghiên cứu & Theo dõi công nghệ kéo dài từ tuần 3 đến tuần 26.
2. Ma trận RACI y tế:
   - R (Responsible): Trưởng khoa/đơn vị trực tiếp vận hành.
   - A (Accountable): Giám đốc vận hành hoặc CIO bệnh viện.
   - C (Consulted): Ban an toàn người bệnh và phòng CNTT.
   - I (Informed): Toàn thể y bác sĩ và nhân viên phòng ban liên quan.
3. Kiểm duyệt lâm sàng & An toàn lâm sàng:
   Hệ thống tự động kích hoạt cảnh báo rủi ro an toàn và áp dụng nguyên tắc giám sát bắt buộc 
   Human-in-the-loop (con người kiểm duyệt chéo) đối với tất cả các tác vụ lâm sàng (đặc biệt là 
   lĩnh vực chẩn đoán hình ảnh như Radiologists) có điểm yêu cầu kỹ năng chuyên môn sâu 
   (Domain Expertise Requirement) đánh giá bởi chuyên gia đạt điểm từ 4.0 trở lên.

--------------------------------------------------------------------------------
CHƯƠNG 7: KIẾN TRÚC MÃ NGUỒN & Ý NGHĨA KỸ THUẬT TỪNG MODULE
--------------------------------------------------------------------------------
Dự án được xây dựng dưới dạng mô hình kiến trúc phân lớp hướng module (Modular Architecture):

- data_pipeline.py:
  Tập trung toàn bộ logic nạp dữ liệu, kiểm tra tính đầy đủ của file vật lý, lọc phạm vi O*NET-SOC 
  và gộp dữ liệu. Sử dụng bộ nhớ đệm @st.cache_data của Streamlit giúp tối ưu hóa bộ nhớ, tránh đọc 
  lại các file CSV lớn trong mỗi lần tương tác của người dùng. Trực tiếp chạy các thuật toán thống kê 
  nền tảng bằng thư viện scipy.stats.

- recommendation_engine.py:
  Chịu trách nhiệm thực thi các phép toán tính điểm ưu tiên và phân vùng dữ liệu. Điểm đặc sắc là 
  module này tương tác trực tiếp với data_pipeline để truy vấn lý do giữ vai trò con người phổ biến nhất 
  của từng occupation (ví dụ: lý do Dynamic hay Quality Oversight) để sinh ra câu khuyến nghị hành động 
  và gợi ý nội dung huấn luyện y tế mang tính thực tế, hoàn toàn được sinh ra từ dữ liệu gốc thay vì 
  chữ tĩnh (hard-coded text).

- roadmap_generator.py:
  Thực hiện mô hình hóa lộ trình dự án dưới dạng sơ đồ tuần. Module này chuyển đổi danh sách các 
  task y tế đã được người dùng chọn lựa ở giao diện thành các bảng kế hoạch hoạt động cụ thể (RACI, 
  KPI, Risk Table) và tính toán phân hạng ngân sách (Budget Tier) thông qua thuật toán phân loại định tính.

- app.py:
  Đóng vai trò bộ lắp ráp giao diện và quản lý trạng thái phiên làm việc (Session State). app.py giữ 
  vai trò điều phối luồng thông tin: đồng bộ hóa ngưỡng Risk Tolerance kéo bởi người dùng thành tham số 
  đầu vào cho data_pipeline và cập nhật ngay lập tức các zone của task vụ trên bản đồ cũng như danh sách 
  kế hoạch hành động.

--------------------------------------------------------------------------------
CHƯƠNG 8: GIAO DIỆN TRẢI NGHIỆM NGƯỜI DÙNG & TƯƠNG TÁC THÔNG MINH
--------------------------------------------------------------------------------
Ứng dụng Streamlit được thiết kế với phong cách hiện đại hướng doanh nghiệp (Premium Enterprise Dashboard):
- Nhúng mã CSS tùy biến cao cấp, định hình lại toàn bộ các đối tượng hiển thị của Streamlit:
  - Sidebar chuyển màu indigo đậm sang trọng với các nút điều hướng bo góc lớn dạng thẻ.
  - Các ô Metric KPI hiển thị trên nền gradient rực rỡ, thu hút sự chú ý vào các con số tổng quát của dự án.
- Stepper thông minh hiển thị ở đầu mỗi trang giúp người dùng luôn định vị được tiến trình làm việc của mình.
- Bố cục Trang 4 được chia theo cấu trúc hai cột (7:4):
  - Cột trái: Cấu trúc Accordion (Mở/Đóng từng vùng) sử dụng expander giúp giảm tải nhận thức, tránh màn 
    hình cuộn quá dài gây mệt mỏi cho người đọc.
  - Cột phải: Ô "Giỏ hàng" trực quan (Live Summary Box). Khi người dùng nhấn nút chọn tác vụ nào ở cột trái, 
    task vụ đó lập tức bay sang ô tóm tắt bên phải đi kèm nhãn màu đặc trưng của zone tương ứng.
- Toàn bộ số thập phân hiển thị trên UI được chuyển hóa sang định dạng Việt Nam (dùng dấu phẩy cho phần thập 
  phân và dấu chấm phân cách hàng nghìn) thông qua hàm dp.vn_number.

--------------------------------------------------------------------------------
CHƯƠNG 9: PHÂN TÍCH KẾT QUẢ THỰC TẾ TRÊN 4 NHÓM NGÀNH LÂM SÀNG/KHSS
--------------------------------------------------------------------------------
Dưới đây là một số phân tích mẫu thực tế thu được từ hệ thống dữ liệu:
1. Bioinformatics Scientists:
   Hầu hết các tác vụ liên quan đến lập trình công cụ sinh học tin học hoặc phát triển phần mềm nghiên cứu 
   nằm trong vùng Green Light do năng lực AI hiện tại đã cực kỳ mạnh mẽ trong việc sinh mã nguồn sinh học 
   và các nhà khoa học sinh tin học cũng có nhu cầu ứng dụng công nghệ cao để giảm tải công việc nghiên cứu.
2. Radiologists (Bác sĩ Chẩn đoán hình ảnh):
   Nhiều tác vụ nằm trong vùng R&D Opportunity hoặc Red Light do đặc thù yêu cầu chuyên môn lâm sàng 
   cực kỳ nghiêm ngặt liên quan trực tiếp đến tính mạng con người. Năng lực của AI trong chẩn đoán hình ảnh 
   cần liên tục được kiểm duyệt và bác sĩ chẩn đoán hình ảnh có mong muốn kiểm soát chất lượng chuyên môn 
   cao (lý do Quality Oversight nổi trội chiếm tỷ lệ cao).
3. Medical Transcriptionists (Nhân viên nhập liệu/phiên dịch y tế):
   Tác vụ nhập và truy xuất hồ sơ bệnh án điện tử nằm trong vùng Red Light hoặc Green Light tùy thuộc vào 
   cấu hình ngưỡng lọc rủi ro. Mặc dù AI xử lý ngôn ngữ tự nhiên đã rất hoàn thiện, nhân viên y tế vẫn lo 
   ngại mất quyền kiểm soát quy trình (lý do Control chiếm đa số trong khảo sát).

--------------------------------------------------------------------------------
CHƯƠNG 10: TỔNG KẾT, Ý NGHĨA KINH TẾ VÀ KHUYẾN NGHỊ CHIẾN LƯỢC
--------------------------------------------------------------------------------
Ứng dụng hỗ trợ đầu tư AI y tế dựa trên WORKBank giải quyết triệt để vấn đề "đầu tư mù quáng" 
trong chuyển đổi số y khoa. Ý nghĩa thực tiễn đạt được bao gồm:
- Tối ưu hóa chi phí: Tránh đổ tiền vào các vùng công nghệ chưa chín muồi (R&D Opportunity) hoặc 
  các vùng nhân sự phản đối gay gắt chưa được đào tạo trước (Red Light).
- Bảo đảm an toàn lâm sàng: Áp dụng cơ chế giám sát Human-in-the-loop tự động khi phát hiện các tác vụ 
  đòi hỏi trình độ chuyên môn cao.
- Nâng cao tỷ lệ thành công: Việc lồng ghép các yếu tố nguyện vọng của con người và phân tích rủi ro 
  giúp tăng tính sẵn sàng chấp nhận công nghệ của tổ chức.

Khuyến nghị dành cho CIO/COO:
1. Bắt đầu với các dự án thử nghiệm nhỏ (Pilot) trong 90 ngày cho các tác vụ thuộc vùng Green Light 
   để chứng minh tính khả thi nhanh chóng (Quick Wins).
2. Thiết lập ngân sách riêng cho chương trình truyền thông và đào tạo nhân sự lâm sàng đối với các 
   task vụ thuộc vùng Red Light, thay vì chỉ tập trung vào việc mua bản quyền công nghệ.
3. Duy trì việc cập nhật định kỳ dữ liệu khảo sát và ý kiến đánh giá của chuyên gia để điều chỉnh bản 
   đồ hành động hàng năm, bảo đảm hệ thống luôn phản ánh chính xác xu hướng công nghệ thực tế.
`,
};

// Xuất module để sử dụng trong môi trường Node.js hoặc ứng dụng JS khác
if (typeof module !== "undefined" && module.exports) {
    module.exports = BAO_CAO_DU_AN;
} else {
    window.BAO_CAO_DU_AN = BAO_CAO_DU_AN;
}
