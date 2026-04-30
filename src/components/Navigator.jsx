import SplitView from "./Shared/SplitView";

function Navigator() {
  return (
    <div style={{ height: "100%" }}>
      <SplitView
        left={
          <div>
            <h3>Левая колонка</h3>
            <p>Эта панель меняет ширину перетаскиванием разделителя.</p>
          </div>
        }
        right={
          <div>
            <h3>Правая колонка</h3>
            <p>Основной контент справа.</p>
          </div>
        }
      />
    </div>
  );
}

export default Navigator;
