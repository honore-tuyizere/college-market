import DashWelcome from "./DashWelcome";
import DashOverview from "./DashOverview";
import DashRecent from "./DashRecent";

export default function DashHeader() {
  return (
    <>
      <div className='min-h-full'>
        <DashWelcome />
        <div>
          <main className='flex-1 pb-8'>
            <DashOverview />
            <DashRecent />
          </main>
        </div>
      </div>
    </>
  );
}
