<nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-full overflow-x-auto scrollbar-hide px-4 py-4">
        <div className="flex items-center justify-between min-w-max">

          {/* LEFT SIDE: LOGO */}
          <div className="text-2xl font-bold tracking-wide flex-shrink-0">
            MyApp
          </div>

          {/* RIGHT SIDE: NAV LINKS */}
          <div className="flex items-center space-x-8">
            <Link href="/sell" className="flex items-center gap-1 bg-yellow-400 text-blue-900 px-3 py-1 rounded-md transition-colors duration-300 hover:bg-yellow-500 whitespace-nowrap">
              <LayoutDashboard size={18} />
              <span>Sell here</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>

            {/* <Link href="/passwordReset" className="flex items-center gap-1 hover:text-gray-200 transition relative group whitespace-nowrap">
              <Home size={18} />
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link> */}

            <Link href="/login" className="flex items-center gap-1 hover:text-gray-200 transition relative group whitespace-nowrap">
              <LogIn size={18} />
              <span>Login</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>

            <Link href="/register" className="flex items-center gap-1 hover:text-gray-200 transition relative group whitespace-nowrap">
              <UserPlus size={18} />
              <span>Register</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>

            {/* <Link href="/passwordReset" className="flex items-center gap-1 hover:text-gray-200 transition relative group whitespace-nowrap">
              <RefreshCcw size={18} />
              <span>Reset</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link> */}
          </div>

        </div>
      </div>
    </nav>
  );
}
