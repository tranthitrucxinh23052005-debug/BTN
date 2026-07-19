# Ưu tiên hoá đầu tư AI — Y tế / Dược / Khoa học sự sống

Ứng dụng Streamlit hỗ trợ CIO bệnh viện / giám đốc vận hành công ty dược / trưởng
phòng chuyển đổi số trả lời 4 câu hỏi theo đúng thứ tự ưu tiên:

1. **Nên làm gì trước?** — khuyến nghị theo vùng Green/Red/R&D/Low Priority.
2. **Triển khai theo quy trình nào?** — giai đoạn, mốc thời gian, tiêu chí go/no-go.
3. **Ai làm, đo bằng gì, ngân sách/rủi ro ra sao?** — RACI, KPI, tier ngân sách, rủi ro.
4. **Bằng chứng nào chứng minh khuyến nghị này đáng tin?** — số liệu WORKBank thật,
   luôn kèm n, luôn truy vết được (traceable) qua nút "Xem bằng chứng".

Dữ liệu: 4 file CSV gốc trong `data/`, được lọc phạm vi theo O*NET-SOC Code
(29-xxxx Lâm sàng, 31-xxxx Hỗ trợ CSSK, 19-1xxx Khoa học sự sống), chỉ giữ
occupation có mặt trong CẢ `domain_worker_desires.csv` VÀ
`expert_rated_technological_capability.csv`. Với dữ liệu hiện có, kết quả đúng là
**4 occupation / 27 task / 168 phản hồi người lao động** (Bioinformatics
Scientists, Molecular and Cellular Biologists, Medical Transcriptionists,
Radiologists). Nếu bạn thay dữ liệu và ra số khác, ứng dụng sẽ hiển thị cảnh báo
ngay ở Trang 1 thay vì âm thầm sai lệch.

## Cấu trúc thư mục

```
app.py
data_pipeline.py
recommendation_engine.py
roadmap_generator.py
data/
  domain_worker_desires.csv
  domain_worker_metadata.csv
  expert_rated_technological_capability.csv
  task_statement_with_metadata.csv
requirements.txt
README.md
```

## Cài đặt & chạy

```bash
pip install -r requirements.txt
streamlit run app.py
```

## Từng file làm gì

- **`data_pipeline.py`** — Nạp 4 CSV (cache bằng `@st.cache_data`), lọc phạm vi
  theo O*NET-SOC Code, xác định occupation "đã audit" (đủ dữ liệu 2 phía) vs
  "chưa audit" (thiếu dữ liệu). Tổng hợp bảng cấp task (`build_task_level_table`)
  gồm `n_workers`, `desire_mean`, `n_experts`, `capacity_mean`, `trust_gap`
  (= capacity_mean − desire_mean), `zone` (ngưỡng 3/3, capacity_threshold có thể
  điều chỉnh qua risk-tolerance slider). Cũng chạy Mann-Whitney U (Automation
  Desire Rating) và Chi-square (13 cột lý do boolean) so sánh Y tế vs Phần còn
  lại của TOÀN BỘ dữ liệu WORKBank (`compare_healthcare_vs_rest`) — đây là bằng
  chứng nền cấp tổng thể, tách biệt với bảng cấp task nhỏ (n=4–9).
  **Không** chạy ANOVA 3 nhóm nghề (không đủ lực thống kê với N=0 Dược, N=1
  occupation Lâm sàng).

- **`recommendation_engine.py`** — Công thức ưu tiên hoá minh bạch
  `priority_score = |trust_gap| × ln(n_workers + n_experts + 1)` (docstring giải
  thích rõ lý do dùng `abs()` và `log()`). Hàm `build_recommendations()` sinh
  thẻ khuyến nghị cho từng vùng, **generate từ dữ liệu thật đang lọc** (không
  hard-code text): Green Light sắp theo `n_workers` giảm dần; Red Light/R&D/Low
  Priority sắp theo `priority_score` giảm dần. Red Light kèm gợi ý đào tạo dựa
  trên lý do Human Agency phổ biến nhất của occupation; R&D kèm khoảng cách
  Capacity cần tăng để vượt ngưỡng.

- **`roadmap_generator.py`** — Sinh Gantt chart 4 giai đoạn (Discovery → Pilot/
  Đào tạo & minh bạch hoá/Nghiên cứu & theo dõi tuỳ vùng → Scale hoặc Hold →
  Governance & Monitoring), bảng RACI (vai trò tuỳ biến qua text input, không
  hard-code tên người), bảng KPI theo giai đoạn (ghi rõ đây là chỉ số gợi ý, không
  phải số liệu đã đo thật), bảng rủi ro & biện pháp giảm thiểu theo vùng, và ước
  tính **tier** ngân sách định tính (Thấp/Trung bình/Cao, không đưa số tiền cụ
  thể) dựa trên số lượng task và tỷ trọng Red Light/R&D (cần custom nhiều hơn).

- **`app.py`** — Lắp ráp giao diện 6 trang bằng `st.sidebar.radio`, quản lý
  `st.session_state` để truyền lựa chọn xuyên suốt Trang 4 → 5 → 6, và xuất
  `action_plan.md` + `recommendations_export.csv` sinh động từ session hiện tại.

## Luồng dữ liệu giữa các module qua `st.session_state`

1. **Trang 3/4**: người dùng kéo slider `risk tolerance` → lưu vào
   `st.session_state.capacity_threshold`. `data_pipeline.build_task_level_table()`
   được gọi lại với ngưỡng mới → zone của từng task cập nhật theo thời gian thực.
2. **Trang 4**: `recommendation_engine.build_recommendations()` sinh thẻ khuyến
   nghị từ bảng cấp task hiện tại. Người dùng tick "Đưa vào lộ trình" cho từng
   task → lưu key `(task_id, occupation, zone)` vào
   `st.session_state.selected_task_keys`.
3. **Trang 5**: đọc `selected_task_keys` + `capacity_threshold`, tái tạo lại đầy
   đủ dữ liệu task đã chọn (`_selected_items_from_state` trong `app.py`), rồi gọi
   `roadmap_generator` để sinh Gantt/RACI/KPI/rủi ro/ngân sách. RACI cho phép
   nhập vai trò tuỳ chỉnh, lưu vào `st.session_state.role_overrides`.
4. **Trang 6**: dùng lại đúng `selected_task_keys` + `role_overrides` để sinh
   `action_plan.md` và `recommendations_export.csv` — nội dung luôn khớp với
   trạng thái hiện tại của Trang 4/5, không phải template tĩnh.

## Ràng buộc phương pháp luận đã tuân thủ

- Không ANOVA 3 nhóm nghề; không ghép 2 task cụ thể thành "nghịch lý"/nhân quả.
- Mọi số liệu cấp task hiển thị ra UI luôn kèm `n`; không gắn nhãn "có ý nghĩa
  thống kê" khi n < 30.
- Mỗi khuyến nghị có nút "Xem bằng chứng" dẫn ngược về đúng Task ID, n_workers,
  n_experts, desire_mean, capacity_mean đã sinh ra nó.
- Occupation trong phạm vi nhưng chưa có dữ liệu (vd. điều dưỡng, dược sĩ, bác sĩ
  lâm sàng trực tiếp nếu xuất hiện trong `data/`) chỉ được hiển thị ở Trang 1 mục
  "chưa audit" — không được sinh khuyến nghị triển khai cho các occupation này.
