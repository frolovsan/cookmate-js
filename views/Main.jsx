const React = require('react');
const Layout = require('./Layout');

module.exports = function Main(props) {
  return (
    <Layout userSession={props.userSession}>
      <script defer src="/js/changeRecipe.js" />
      <div className="main-container">
        <button className="recipeBtn" type="button">
          Добавить рецепт
        </button>
        <button className="themeBtn" type="button">Изменить тему!</button>
      </div>
      <div className="recipe-container">
        {props.recipesArr.map((el) => (
          <div className="recipeCard" key={el.id}>
            <h2 className="oneRecipe" key={el.id}>
              {el.name}
            </h2>
            <img src={el.image} alt="recipe" key={el.id} />
            <p key={el.id} style={{ display: 'none' }}>
              {el.description}
            </p>
            {props.user === el.userId ? (
              <>
                <button type="button" className="delBtn" id={el.id} key={el.id}>
                  Удалить
                </button>
                <button
                  type="button"
                  className="editBtn"
                  id={el.id}
                  key={el.id}
                >
                  Изменить
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};
