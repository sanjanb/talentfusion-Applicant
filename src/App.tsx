
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header"; // This import stays the same
import Dashboard from "./components/Dashboard";
import Portfolio from "./components/Portfolio";
import JobSkillAnalysis from "./components/JobSkillAnalysis";
import ApplicantDashboard from "./components/ApplicantDashboard";
import RecruiterDashboard from "./components/RecruiterDashboard";
import LoginForm from "./components/auth/LoginForm";
import ApplicantRegister from "./components/auth/ApplicantRegister";
import RecruiterRegister from "./components/auth/RecruiterRegister";
import SkillRadar from "@/components/SkillRadar";
import LearningPlan from "@/components/LearningPlan";
import { useStore } from "@/store/useStore";

// Create dashboard page component
const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <Dashboard />
    </div>
  );
};

// Create portfolio page component with the new Portfolio component
const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <Portfolio />
    </div>
  );
};

// Update the SkillsPage component
const SkillsPage = () => {
  const userSkills = useStore(state => state.skills);

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Skills Overview */}
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Skills</h2>
            <SkillRadar 
              skills={userSkills.map(skill => ({
                name: skill.name,
                value: skill.level,
                category: skill.category
              }))}
              size={250}
              className="mx-auto mb-6"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Your current skill proficiency levels
            </p>
          </div>

          {/* Skills Gap Analysis */}
          <div className="lg:col-span-2">
            <JobSkillAnalysis />
          </div>
        </div>
        
        {/* Learning Plan Section */}
        <div className="mt-12 glass-card p-6">
          <LearningPlan />
        </div>
      </div>
    </div>
  );
};

// Update the JobsPage component
const JobsPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <JobSkillAnalysis />
    </div>
  );
};

// New ApplicantDashboardPage component
const ApplicantDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <ApplicantDashboard />
    </div>
  );
};

// New RecruiterDashboardPage component
const RecruiterDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <RecruiterDashboard />
    </div>
  );
};

// Auth pages
const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <LoginForm />
    </div>
  );
};

const ApplicantRegisterPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <ApplicantRegister />
    </div>
  );
};

const RecruiterRegisterPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <RecruiterRegister />
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/applicant" element={<ApplicantDashboardPage />} />
            <Route path="/recruiter" element={<RecruiterDashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register/applicant" element={<ApplicantRegisterPage />} />
            <Route path="/register/recruiter" element={<RecruiterRegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
