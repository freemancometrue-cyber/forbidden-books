import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { baseOptions } from '@/app/layout.shared';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import React from 'react';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const page = source.getPage(['en']);
  if (!page) return {};

  return {
    title: { absolute: page.data.title as string },//读取en.md里面的定义
    description: page.data.description,
  };
}

export default async function EnglishHomePage() {
  const page = source.getPage(['en']);

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
              Seek the Truth, Reject Censorship
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              An archive dedicated to preserving and disseminating real historical memories banned by the Communist Party. Here, we fight against political censorship and safeguard the value of freedom of speech.
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
