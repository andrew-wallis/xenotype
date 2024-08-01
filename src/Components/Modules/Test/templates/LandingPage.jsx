import { useContext } from "react";
import { AppContext } from "../../../../App";
import getFontStylesheet from "../../../../utils/getFontStylesheet";
import getFontFamily from "../../../../utils/getFontFamily";
import getFonts from "./helpers/getFonts";

function LandingPage() {

  const context = useContext(AppContext);
  const [thisFont, pairingFont] = getFonts(context);

  const title = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${3.75 / thisFont.adjust}rem`,
    lineHeight: "3.75rem"
  }

  const hero = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${3 / thisFont.adjust}rem`,
    lineHeight: "3.5rem"
  }

  const heading = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${2.25 / thisFont.adjust}rem`,
    lineHeight: "2.5rem"
  }

  const subheading = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${1.5 / thisFont.adjust}rem`,
    lineHeight: "1.8rem"
  }

  const feature = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1.125 / pairingFont.adjust}rem`,
    lineHeight: "1.7rem"
  }

  const paragraph = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1 / pairingFont.adjust}rem`,
    lineHeight: "1.5rem"
  }

  const button = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${0.875 / pairingFont.adjust}rem`,
    lineHeight: "1rem"
  }

  const label = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${0.875 / pairingFont.adjust}rem`,
    lineHeight: "1rem"
  }

  return (
    <div className="">
      <style>
        @import url('{getFontStylesheet(context.primaryFont, ["rg"])}');
        @import url('{getFontStylesheet(context.secondaryFont, ["rg"])}');
      </style>
      <div className="mb-40">
        <div className="mx-auto mb-6 max-w-2xl font-semibold text-center" style={{...title}}>Stay focused,<br/>get more done</div>
        <div className="mx-auto mb-8 max-w-2xl text-center" style={{...feature}}>Stay focused and get more done with our app. Simplify tasks, boost productivity, and achieve goals.</div>
        <div className="flex gap-2 mb-8 max-w-96 mx-auto">
          <div style={{...button}} className="flex-1 text-center rounded-full bg-black dark:text-black dark:bg-gray-200 text-white font-semibold uppercase tracking-wider py-4">Get Started</div>
          <div style={{...button}} className="flex-1 text-center rounded-full text-gray-800 dark:text-gray-300 border border-gray-300 font-semibold uppercase tracking-wider py-4">Find Out More</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8 mb-40">
        {[
          {title: "Boost productivity", text: "Accomplish more in less time with streamlined task management."}, 
          {title: "Save time", text: "Track your time efficiently to focus on what matters most."}, 
          {title: "Enhance collaboration", text: "Track your time efficiently to focus on what matters most."}, 
          {title: "Reduce stress", text: "Stay organized and focused, reducing daily stress and overwhelm."}
        ].map((benefit) => (
          <div>
            <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-gray-100 dark:bg-gray-900 mb-4"></div>
            <div style={{...subheading}} className="mb-4 font-semibold">{benefit.title}</div>
            <div style={{...feature}}>{benefit.text}</div>
          </div>
        ))}
      </div>
      <div className="mb-40 max-w-2xl text-center mx-auto">
        <div style={{...subheading}} className="font-semibold mb-6">Our team’s productivity has soared since we started using this app. It has streamlined our workflow and significantly reduced our stress levels.</div>
        <div style={{...label}} className="font-semibold tracking-wider uppercase">Jane Smith, GlobalTech</div>
      </div>
      <div className="mb-40 max-w-2xl mx-auto">
        {[
          {title: "Smart Task Lists", text: "Create and manage tasks lists effortlessly. Prioritse tasks, set deadlines, and receive reminders to stay on track and boost productivity."},
          {title: "Integrated Calendar", text: "Sync your tasks with your calendar to visualize your schedule. Plan your day, week, or month efficiently and never miss an important deadline."},
          {title: "Real-Time Collaboration", text: "Collaborate with team members in real-time. Share tasks, assign responsibilities, and communicate seamlessly to ensure everyone is on the same page."},
          {title: "Detailed Analytics", text: "Gain insights into your productivity patterns with detailed analytics. Track your progess, identify areas for improvement, and optimize your workflow."}
        ].map((feature, index) => (
          <div className={`flex gap-8 mb-32 ${index % 2 === 1 ? "flex-row-reverse" : "not-reverse" }`}>
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-6 font-semibold" style={{...heading}}>{feature.title}</div>
              <div className="mb-4" style={{...paragraph}}>{feature.text}</div>
              <div className="underline font-medium" style={{...paragraph}}>Learn more</div>
            </div>
            <div className="w-[400px] h-[320px] bg-gray-100 dark:bg-gray-900"></div>
          </div>
        ))}
      </div>
      <div className="mb-40 bg-gray-100 dark:bg-gray-900 py-24">
        <div className="mx-auto mb-6 max-w-2xl font-semibold text-center" style={{...hero}}>Stay focused,<br/>get more done</div>
        <div className="mx-auto mb-8 max-w-2xl text-center" style={{...feature}}>Stay focused and get more done with our app. Simplify tasks, boost productivity, and achieve goals.</div>
        <div className="flex gap-2 mb-8 max-w-96 mx-auto">
          <div style={{...button}} className="flex-1 text-center rounded-full bg-black dark:text-black dark:bg-gray-200 text-white font-semibold uppercase tracking-wider py-4">Get Started</div>
          <div style={{...button}} className="flex-1 text-center rounded-full text-gray-800 dark:text-gray-300 border border-gray-300 font-semibold uppercase tracking-wider py-4">Find Out More</div>
        </div>
      </div>
      <div className="mb-40">
        <div className="grid grid-cols-4 gap-8" style={{...paragraph}}>
          <div>
            <h2 className="mb-6 font-semibold uppercase tracking-wider">Solutions</h2>
            <ul className="flex flex-col gap-6">
              <li>Hosting</li>
              <li>Data Services</li>
              <li>Uptime Monitoring</li>
              <li>Enterprise Services</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 font-semibold uppercase tracking-wider">Support</h2>
            <ul className="flex flex-col gap-6">
              <li>Pricing</li>
              <li>Documentation</li>
              <li>Guides</li>
              <li>API Reference</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 font-semibold uppercase tracking-wider">Company</h2>
            <ul className="flex flex-col gap-6">
              <li>About</li>
              <li>Blog</li>
              <li>Jobs</li>
              <li>Press</li>
              <li>Partners</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 font-semibold uppercase tracking-wider">Legal</h2>
            <ul className="flex flex-col gap-6">
              <li>Claim</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;