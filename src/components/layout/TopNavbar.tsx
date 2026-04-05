const TopNavbar = () => {
  return (
    <header className="fixed top-0 left-[250px] right-0 h-16 bg-emiru-black flex items-center justify-end px-6 z-40">
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <div className="border border-emiru-white/20 rounded-full px-4 py-1.5 bg-transparent mr-4">
            <span className="text-emiru-white text-sm font-medium">Today: 7000 ETB</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-emiru-white/60 text-[10px] uppercase">Welcome</p>
            <p className="text-emiru-white text-sm font-semibold">Eyasu Kebede</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emiru-red" />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
