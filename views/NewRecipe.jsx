const React = require('react');
const Layout = require('./Layout');

module.exports = function NewRecipe(props) {
  return (
    <Layout userSession={props.userSession}>
      <script defer src="/js/newrecipe.js" />
      <div className="newRecDiv">
        <form className="newRecForm" name="newRecForm" encType="multipart/form-data">
          <input className="nameInput" type="text" name="name" placeholder="Название блюда" />
          <textarea className="descInput" type="text" name="description" placeholder="Инструкция" />
          <label>Выберите фото для загрузки:</label>
          <input className="fileInput" type="file" id="image" name="image" />
          <button className="addNewBtn" type="submit">
            Добавить рецепт
          </button>
        </form>
        <h3 className="msg"></h3>
      </div>
    </Layout>
  );
};
