import "../../styles/pages/MainPage.css";

const MainPage = () => {
  return (
    <div className="hero is-fullheight is-dark">
      <div className="hero-body">
        <div>
          {/* Tiêu đề */}
          <h1 className="title">Caro Game</h1>

          {/* Mô tả ngắn */}
          <p className="subtitle">Chọn chế độ chơi để bắt đầu</p>

          {/* Nút chọn chế độ */}
          <div className="buttons">
            <button
              className="button is-info"
              onClick={() => (window.location.href = "/offline")}
            >
              Chơi Offline (2 Người)
            </button>
            <button
              className="button is-primary"
              onClick={() => (window.location.href = "/robot")}
            >
              Chơi với Máy
            </button>
          </div>

          {/* Hình nền */}
          <figure className="image">
            <img
              src="https://via.placeholder.com/400"
              alt="Caro Game Background"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
