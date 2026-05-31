import AiLearningHub from "../pages/AiLearningHub";
import AiTopicPage   from "../pages/AiTopicPage";

const publicRoutes = (
  <>
    <Route path="/learn/ai"       element={<AiLearningHub />} />
    <Route path="/learn/ai/:slug" element={<AiTopicPage />} />
  </>
);

export default publicRoutes;