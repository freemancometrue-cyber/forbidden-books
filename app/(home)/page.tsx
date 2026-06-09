import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { baseOptions } from '@/app/layout.shared';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import React from 'react';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const page = source.getPage([]);
  if (!page) return {};

  return {
    //先去看看 index.md 里面有没有写标题？（? 的作用）
    //如果有写： 就把写的那个标题拿过来，并且用 absolute，绝对不要加 | 小尾巴。
    //如果没有写（像您刚刚把它删空了）： 就返回一个 undefined（代表什么都没有）。
    //一旦它收到 undefined（没拿到页面专门的标题），它就会立刻跑去问全局大哥（也就是在 constants.ts 里设定的 天朝禁书-拉清单），然后把它作为标题显示出来。
    title: page.data.title ? { absolute: page.data.title as string } : undefined,
    description: page.data.description,
  };
}

export default async function HomePage() {
  const page = source.getPage([]);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <HomeLayout {...baseOptions}>
      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden bg-background">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>

        <div className="container relative z-10 py-16 md:py-24 max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:to-neutral-500">
              探寻真相，拒绝言论审查
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              一个致力于保存和传播真实历史记忆的被共产党禁止传播的图书档案库。在这里，我们对抗政治审查对真相的封锁，守护言论自由的价值。
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-10 shadow-xl">
            <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-table:overflow-hidden prose-table:rounded-lg prose-table:shadow-sm prose-th:bg-muted/50 prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3">
              <MDX components={defaultMdxComponents} />
            </article>
          </div>
        </div>
      </main>
    </HomeLayout>
  );
}
