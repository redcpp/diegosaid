import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';

const Blog = lazy(() => import('@/pages/Blog'));
const Adr47Post = lazy(() => import('@/pages/blog/Adr47Post'));
const DistributedSystemsPost = lazy(() => import('@/pages/blog/DistributedSystemsPost'));
const LlmInferencePost = lazy(() => import('@/pages/blog/LlmInferencePost'));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/adr47" element={<Adr47Post />} />
          <Route path="/blog/distributed-systems" element={<DistributedSystemsPost />} />
          <Route path="/blog/llm-inference" element={<LlmInferencePost />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
