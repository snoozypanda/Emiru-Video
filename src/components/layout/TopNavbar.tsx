const TopNavbar = () => {
  return (
    <header className="fixed top-0 left-[200px] right-0 z-40 flex h-16 items-center justify-end bg-emiru-black px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-emiru-white/20 bg-emiru-white/10 px-5 py-2">
          <span className="text-sm font-semibold text-emiru-white">Today: 7000 ETB</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] leading-tight text-emiru-white/60">Welcome</p>
            <p className="text-sm font-semibold leading-tight text-emiru-white">Eyasu Kebede</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emiru-white/30 bg-emiru-red">
            <span className="text-xs font-bold text-emiru-white">EK</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
