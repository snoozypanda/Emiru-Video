const TopNavbar = () => {
  return (
    <header className="fixed top-0 left-[250px] right-0 h-16 bg-emiru-black flex items-center justify-end px-6 z-40">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-emiru-white/60 text-xs">Welcome</p>
          <p className="text-emiru-white text-sm font-semibold">Eyasu Kebede</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-emiru-white/20 border-2 border-emiru-white/40" />
      </div>
    </header>
  );
};

export default TopNavbar;
