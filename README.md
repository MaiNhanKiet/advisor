# Advisor

Dự án Next.js với Tailwind CSS và shadcn/ui.

## Công nghệ sử dụng

- **Next.js 16** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Component library (New York style)
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library

## Cấu trúc dự án

```
ADVISOR/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles với Tailwind CSS
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Trang chủ
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   └── utils.ts         # Helper functions (cn, etc.)
├── hooks/               # Custom React hooks
├── public/              # Static files
└── components.json      # shadcn/ui configuration
```

## Bắt đầu

Cài đặt dependencies:

```bash
npm install
```

Chạy development server:

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt để xem kết quả.

## Thêm Components từ shadcn/ui

Để thêm các components từ shadcn/ui:

```bash
npx shadcn@latest add [component-name]
```

Ví dụ:
```bash
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

Xem danh sách đầy đủ các components tại: https://ui.shadcn.com/docs/components

## Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Chạy ESLint

## Tùy chỉnh Theme

Theme được cấu hình trong `app/globals.css` với CSS variables. Bạn có thể thay đổi màu sắc và các biến khác trong file này.

## Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

