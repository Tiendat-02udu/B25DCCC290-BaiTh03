# ShopMini

Ứng dụng cửa hàng mini được xây dựng với React, TypeScript, Vite, React Router, Context API và Redux Toolkit.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

Kiểm tra trước khi build:

```bash
npm run typecheck
npm run lint
npm run build
```

## Tính năng

- Trang cửa hàng có tìm kiếm theo tên, lọc danh mục và bố cục responsive.
- Chi tiết sản phẩm, giỏ hàng và thanh toán dùng dữ liệu từ Fake Store API.
- Redux Toolkit quản lý danh sách sản phẩm (đang tải/thành công/thất bại) và giỏ hàng.
- ThemeContext quản lý giao diện sáng/tối; AuthContext mô phỏng đăng nhập.
- Checkout yêu cầu đăng nhập và quay lại đúng trang sau khi đăng nhập.

Đăng nhập thử với bất kỳ tên người dùng nào và mật khẩu `123456`.

## Hướng thiết kế

Giao diện theo hướng tối giản cổ điển: nền màu giấy ấm, điểm nhấn olive trầm, tiêu đề Newsreader và nội dung Roboto. Bố cục ưu tiên khoảng trắng, đường viền mảnh, chuyển động nhẹ và hỗ trợ giảm chuyển động; giao diện tối vẫn dùng cùng hệ màu dịu.

## Cấu trúc chính

```text
src/
├── app/                 # Redux store và typed hooks
├── components/          # Header, icon, thẻ sản phẩm, protected route
├── contexts/            # ThemeContext và AuthContext
├── features/            # Redux slices cho sản phẩm và giỏ hàng
├── layouts/             # Layout dùng chung
├── pages/               # Các trang ứng dụng
└── types/               # Kiểu dữ liệu dùng chung
```
