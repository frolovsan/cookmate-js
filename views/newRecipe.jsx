const React = require('react');
const Layout = require('./Layout');

module.exports = function UserLogin() {
  return (
    <Layout>
      <script defer src="/js/newrecipe.js" />
      <div className="newRecDiv">
        <form className="newRecForm" name="newRecForm" encType="multipart/form-data">
          <br />
          <input type="text" name="name" placeholder="Название блюда" />
          <br />
          <input type="text" name="description" placeholder="Инструкция" />
          <br />
          <label>Выберите фото для загрузки:</label>
          <input type="file" id="image" name="image" />
          <button className="addNewBtn" type="submit">
            Добавить рецепт
          </button>
        </form>
        <h3 className="msg"></h3>
        <div className="imgDiv"></div>
      </div>
    </Layout>
  );
};
