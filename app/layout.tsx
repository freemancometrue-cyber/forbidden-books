import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import CustomSearchDialog from '@/components/search';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
});

import { SITE_CONFIG } from '@/lib/constants';
//它的作用是给全站定一个**“保底规矩”**
export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_CONFIG.title}`,
    default: SITE_CONFIG.title, //首页的标题默认就是这个
  },
  //只要某个页面（比如《夹边沟记事》）自己写了标题和描述，那就优先用它自己的！” “如果某个页面太懒了，什么都没写（或者是首页没取名字），那就拿 layout.tsx 里的 default 标题和 description 描述来兜底/顶替
  description: SITE_CONFIG.description,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            SearchDialog: CustomSearchDialog,
          }}
          i18n={{
            locale: 'zh-CN',
            translations: {
              search: '搜索',
              searchNoResult: '无结果',
              toc: '目录',
              tocNoHeadings: '无',
              lastUpdate: '更新于',
              chooseLanguage: '选择语言',
              nextPage: '下一页',
              previousPage: '上一页',
              chooseTheme: '选择主题',
              editOnGithub: '访问拉清单www.laqingdan.org',
            },
          }}
        >
          {children}
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
