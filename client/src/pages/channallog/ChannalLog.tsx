// Structure: V[MAJOR].[MINOR].[PATCH]
// MAJOR (1) → Big changes, like redesigns or breaking features. Old versions may stop working
// MINOR (106) → New features or improvements that don’t break old ones.
// PATCH (0) → Small bug fixes or tweaks.

const ChannalLog = () => {
  return (
    <div className="log none">
      <p className="log-heading">Gresic 2025 - Release Notes</p>

      <div className="log-container">
        <div className="log-box">
          <div className="log-date">
            05 Aug - <span>V1.1.0</span>
          </div>
          <div className="log-data">
            <section className="changelog">
              Redesigned footer and added more links and a release notes page to store history of what we did yet.
            </section>
          </div>
        </div>

        <div className="log-box">
          <div className="log-date">
            04 Aug - <span>V1.0.0</span>
          </div>
          <div className="log-data">
            <section className="changelog">
              Gresic is now live with a clean homepage, smooth search,
              mobile-friendly pages, and dark mode (beta). This version lays the
              foundation for everything coming next — simple, solid, and ready
              to grow. Stay tuned for new features like user accounts,
              newsletters, and community tools. 💚
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannalLog;
