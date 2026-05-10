import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import Blog from '@/pages/Blog';
import Adr47Post from '@/pages/blog/Adr47Post';
import DistributedSystemsPost from '@/pages/blog/DistributedSystemsPost';
import LlmInferencePost from '@/pages/blog/LlmInferencePost';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/adr47" element={<Adr47Post />} />
        <Route path="/blog/distributed-systems" element={<DistributedSystemsPost />} />
        <Route path="/blog/llm-inference" element={<LlmInferencePost />} />
      </Routes>
    </Layout>
  );
}
