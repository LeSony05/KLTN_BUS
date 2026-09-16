// frontend/src/modules/client/property/models/property.data.ts
import { PropertyDemand } from './property.model';

export const MOCK_PROPERTY_DEMANDS: PropertyDemand[] = [
  {
    id: '1',
    title: 'Biệt Thự Vườn Thảo Điền Phong Cách Bắc Âu Hiện Đại',
    needType: 'BUY',
    propertyType: 'Biệt thự vườn',
    price: '6.8 Tỷ VNĐ',
    minPriceNum: 6800,
    maxPriceNum: 6800,
    area: '185 m²',
    minAreaNum: 185,
    location: 'Đường Nguyễn Văn Hưởng, Phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh',
    province: 'Hồ Chí Minh',
    district: 'TP. Thủ Đức',
    legal: 'Sổ hồng riêng',
    direction: 'Đông Nam',
    note: 'Đường trước nhà 12m (Ô tô tránh nhau)',
    description: `Cần chuyển nhượng gấp căn biệt thự song lập phong cách Bắc Âu tại khu dân cư cao cấp Thảo Điền, TP. Thủ Đức. Không gian sống yên tĩnh, nhiều cây xanh, an ninh khép kín 24/7.

Thông tin kết cấu: 1 trệt, 2 lầu, 1 sân thượng ngắm trọn hoàng hôn sông Sài Gòn. Toàn bộ nội thất nhập khẩu cao cấp từ Châu Âu, gỗ sồi tự nhiên, thiết bị vệ sinh Kohler, hệ thống bếp Hafele hiện đại.

Pháp lý & Quy hoạch: Sổ hồng chính chủ, đã hoàn công đầy đủ, pháp lý chuẩn chỉnh sẵn sàng công chứng sang tên ngay trong ngày.

Vị trí kết nối: Cách trường Quốc tế BIS chỉ 3 phút, cách trạm Metro An Phú 5 phút di chuyển, xung quanh đầy đủ nhà hàng cao cấp, siêu thị An Nam Gourmet.`,
    timeAgo: '10 phút trước',
    createdAt: '12/09/2026',
    authorName: 'Trần Quốc Anh',
    authorCode: 'KC-001',
    authorPhone: '0912.345.678',
    isVerified: true,
    memberSince: '2024',
    bedrooms: 4,
    bathrooms: 3,
    interior: 'Đầy đủ nội thất cao cấp',
    floors: '3 tầng + Sân thượng',
    facade: '9.5 mét',
    roadWidth: '12m (Ô tô tránh nhau)',
    amenities: [
      'Hồ bơi nóng', 
      'Camera an ninh 24/7', 
      'Gara để 2 ô tô', 
      'Khóa cửa vân tay', 
      'Sân vườn cây xanh', 
      'Gần trạm Metro'
    ],
    images: [
      '/images/mock/prop1.jpg',
      '/images/mock/prop2.jpg',
      '/images/mock/prop3.jpg',
      '/images/mock/prop4.jpg',
      '/images/mock/prop5.jpg'
    ]
  },
  {
    id: '2',
    title: 'Cần thuê mặt bằng kinh doanh F&B Quận 1 ngân sách 40 triệu',
    needType: 'RENT',
    propertyType: 'Mặt bằng kinh doanh',
    price: '25 Triệu - 40 Triệu/tháng',
    minPriceNum: 25,
    maxPriceNum: 40,
    area: '60 - 90 m²',
    minAreaNum: 60,
    location: 'Đường Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh',
    province: 'Hồ Chí Minh',
    district: 'Quận 1',
    legal: 'Hợp đồng công chứng dài hạn',
    direction: 'Chính Nam',
    note: 'Cần vỉa hè rộng để xe, có lối đi riêng biệt',
    description: `Chuỗi trà sữa & cà phê thương hiệu cần thuê mặt bằng kinh doanh tại Quận 1 (khu vực Nguyễn Trãi, Đề Thám, Bùi Viện, Trần Hưng Đạo).
Yêu cầu:
- Mặt tiền tối thiểu 4.5m, diện tích tầng trệt 60-90m².
- Vỉa hè rộng rãi để xe máy cho khách, hệ thống điện nước 3 pha ổn định.
- Ký hợp đồng dài hạn từ 3 đến 5 năm, thời gian sửa chữa 15 - 30 ngày.
- Giá thuê linh hoạt từ 25 - 40 triệu/tháng tùy theo vị trí và độ đẹp.`,
    timeAgo: '35 phút trước',
    createdAt: '12/09/2026',
    authorName: 'Trần Thị Mai Phương',
    authorCode: 'KC-088',
    authorPhone: '0988.765.432',
    isVerified: true,
    images: [
      '/images/mock/prop4.jpg',
      '/images/mock/prop5.jpg'
    ]
  },
  {
    id: '3',
    title: 'Tìm mua nhà phố hẻm xe hơi Bình Thạnh tài chính 6 tỷ',
    needType: 'BUY',
    propertyType: 'Nhà phố',
    price: '5.5 Tỷ - 6.5 Tỷ VNĐ',
    minPriceNum: 5500,
    maxPriceNum: 6500,
    area: '50 - 75 m²',
    minAreaNum: 50,
    location: 'Đường Phan Văn Trị, Quận Bình Thạnh, TP. Hồ Chí Minh',
    province: 'Hồ Chí Minh',
    district: 'Quận Bình Thạnh',
    legal: 'Sổ hồng hoàn công đầy đủ',
    direction: 'Chính Đông',
    note: 'Nhà xây 1 trệt 2 lầu đúc kiên cố, vào ở ngay',
    description: `Gia đình 4 người cần mua nhà định cư lâu dài tại Bình Thạnh (gần ranh Phú Nhuận hoặc Gò Vấp).
Yêu cầu:
- Diện tích đất từ 50m² trở lên, kết cấu tối thiểu 1 trệt 2 lầu (3 phòng ngủ, 3WC).
- Hẻm xe hơi thông thoáng, an ninh, dân trí cao.
- Sổ hồng hoàn công đầy đủ, pháp lý chuẩn chỉnh.
- Sẵn sàng đặt cọc ngay trong tuần.`,
    timeAgo: '1 giờ trước',
    createdAt: '12/09/2026',
    authorName: 'Lê Hoàng Nam',
    authorCode: 'KC-102',
    authorPhone: '0903.112.233',
    isVerified: true,
  },
  {
    id: '4',
    title: 'Cần thuê kho xưởng chứa hàng logistics diện tích 500m² - 1000m²',
    needType: 'RENT',
    propertyType: 'Kho xưởng',
    price: '80 Triệu - 120 Triệu/tháng',
    minPriceNum: 80,
    maxPriceNum: 120,
    area: '500 - 1,000 m²',
    minAreaNum: 500,
    location: 'Khu công nghiệp Cát Lái, TP. Thủ Đức, TP. Hồ Chí Minh',
    province: 'Hồ Chí Minh',
    district: 'TP. Thủ Đức',
    legal: 'Đầy đủ PCCC và giấy phép công nghiệp',
    direction: 'Đông Bắc',
    note: 'Xe container 40 feet ra vào 24/24 không cấm giờ',
    description: `Công ty logistics cần thuê kho xưởng đạt chuẩn để lưu trữ hàng tiêu dùng và xuất nhập khẩu.
Yêu cầu bắt buộc:
- Diện tích: 500m² - 1.000m², trần cao từ 7m trở lên, nền bê tông chịu tải 3-5 tấn/m².
- Hệ thống PCCC nghiệm thu chuẩn theo quy định mới.
- Xe container ra vào quay đầu thuận tiện không bị vướng dây điện hay cấm tải.
- Hợp đồng từ 3 - 5 năm, cọc 3 tháng thanh toán từng tháng.`,
    timeAgo: '2 giờ trước',
    createdAt: '12/09/2026',
    authorName: 'Đặng Quốc Bảo',
    authorCode: 'KC-214',
    authorPhone: '0977.889.900',
    isVerified: false,
  },
  {
    id: '5',
    title: 'Khách VIP tìm mua biệt thự compound Quận 7 tài chính 25 tỷ',
    needType: 'BUY',
    propertyType: 'Biệt thự',
    price: '20 Tỷ - 28 Tỷ VNĐ',
    minPriceNum: 20000,
    maxPriceNum: 28000,
    area: '200 - 350 m²',
    minAreaNum: 200,
    location: 'Khu đô thị Phú Mỹ Hưng, Quận 7, TP. Hồ Chí Minh',
    province: 'Hồ Chí Minh',
    district: 'Quận 7',
    legal: 'Sổ hồng lâu dài',
    direction: 'Chính Nam',
    note: 'Khu dân cư khép kín bảo vệ 24/7, có sân vườn thoáng mát',
    description: `Doanh nhân cần tìm biệt thự đơn lập hoặc song lập trong các khu compound cao cấp tại Quận 7 (Phú Mỹ Hưng, Chateau, Nine South hoặc Lavila).
Yêu cầu:
- Diện tích đất từ 200m² trở lên, có sân vườn, chỗ đậu 2 xe ô tô.
- Khu compound an ninh tuyệt đối, tiện ích công viên, hồ bơi hoàn thiện.
- Tình trạng nhà thô hoặc hoàn thiện cao cấp.
- Tài chính sẵn sàng giải ngân ngay.`,
    timeAgo: '3 giờ trước',
    createdAt: '12/09/2026',
    authorName: 'Võ Minh Tuấn',
    authorCode: 'KC-007',
    authorPhone: '0934.567.890',
    isVerified: true,
  },
  {
    id: '6',
    title: 'Cần thuê căn hộ 2PN đầy đủ nội thất khu vực Tân Bình',
    needType: 'RENT',
    propertyType: 'Căn hộ chung cư',
    price: '12 Triệu - 16 Triệu/tháng',
    minPriceNum: 12,
    maxPriceNum: 16,
    area: '65 - 75 m²',
    minAreaNum: 65,
    location: 'Đường Cộng Hòa, Quận Tân Bình, TP. Hồ Chí Minh',
    province: 'Hồ Chí Minh',
    district: 'Quận Tân Bình',
    legal: 'Hợp đồng thuê 1 năm',
    direction: 'Tây Nam',
    note: 'Nội thất hiện đại đầy đủ máy giặt, tủ lạnh, giường tủ',
    description: `Chuyên gia làm việc tại sân bay Tân Sơn Nhất cần thuê căn hộ 2 phòng ngủ, 2WC.
Yêu cầu:
- Căn hộ thuộc các chung cư có ban quản lý tốt (như Botanica, Sky Center, Carillon...).
- Full nội thất cao cấp chỉ cần xách vali vào ở.
- Ban công thoáng mát, view đẹp.
- Ký hợp đồng 1 năm gia hạn thêm, thanh toán định kỳ.`,
    timeAgo: '4 giờ trước',
    createdAt: '12/09/2026',
    authorName: 'Phạm Thu Trang',
    authorCode: 'KC-156',
    authorPhone: '0918.223.344',
    isVerified: true,
  },
  {
    id: '7',
    title: 'Tìm mua Shophouse khối đế chung cư Cầu Giấy Hà Nội tài chính 15 tỷ',
    needType: 'BUY',
    propertyType: 'Shophouse',
    price: '12 Tỷ - 16 Tỷ VNĐ',
    minPriceNum: 12000,
    maxPriceNum: 16000,
    area: '90 - 140 m²',
    minAreaNum: 90,
    location: 'Quận Cầu Giấy, Hà Nội',
    province: 'Hà Nội',
    district: 'Quận Cầu Giấy',
    legal: 'Sổ đỏ lâu dài hoặc 50 năm',
    direction: 'Chính Bắc',
    note: 'Vị trí mặt tiền sảnh cư dân đông đúc, khai thác cho thuê tốt',
    description: `Nhà đầu tư cá nhân tìm mua shophouse tầng trệt các tòa chung cư cao cấp tại quận Cầu Giấy hoặc Nam Từ Liêm (Hà Nội).
Mục đích: Khai thác cho thuê dài hạn ngân hàng hoặc chuỗi siêu thị tiện ích.
Tài chính 15 tỷ sẵn sàng thanh toán một lần.`,
    timeAgo: '5 giờ trước',
    createdAt: '11/09/2026',
    authorName: 'Đỗ Văn Thành',
    authorCode: 'KC-304',
    authorPhone: '0966.554.433',
    isVerified: true,
  },
  {
    id: '8',
    title: 'Cần mua đất vườn / trang trại nghỉ dưỡng khu vực Bảo Lộc Lâm Đồng',
    needType: 'BUY',
    propertyType: 'Đất vườn / Trang trại',
    price: '2 Tỷ - 3 Tỷ VNĐ',
    minPriceNum: 2000,
    maxPriceNum: 3000,
    area: '1,000 - 3,000 m²',
    minAreaNum: 1000,
    location: 'TP. Bảo Lộc, Lâm Đồng',
    province: 'Lâm Đồng',
    district: 'TP. Bảo Lộc',
    legal: 'Sổ đỏ có sẵn một phần thổ cư',
    direction: 'Tây Bắc',
    note: 'Thế đất triền nhẹ có view đồi thông hoặc suối tự nhiên',
    description: `Gia đình tìm mua đất làm second home nghỉ dưỡng tại TP. Bảo Lộc (xã Lộc Tân, Đambri, Lộc Châu).
Yêu cầu:
- Có sẵn 100-200m² đất thổ cư hoặc quy hoạch đất ở.
- View thoáng đẹp nhìn thung lũng hoặc đồi thông, có nguồn nước tự nhiên.
- Đường bê tông xe hơi 7 chỗ vào tận cổng.`,
    timeAgo: '6 giờ trước',
    createdAt: '11/09/2026',
    authorName: 'Hoàng Kim Dung',
    authorCode: 'KC-042',
    authorPhone: '0908.998.877',
    isVerified: true,
  },
];
