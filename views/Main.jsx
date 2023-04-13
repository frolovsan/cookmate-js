const React = require('react');
const Layout = require('./Layout');

module.exports = function Main(props) {
  return (
    <Layout userSession={props.userSession}>
      <script defer src="/js/deleteRecipe.js" />
      <div className="main-container">
        <h1>Welcome to CookMate</h1>
      </div>
      <button className="recipeBtn" type="button">
        Добавить рецепт
      </button>
      <div className="recipe-container">
        {props.recipesArr.map((el) => (
          <a href={`/recipes/${el.id}`}>
            <div className="recipeCard" key={el.id}>
              <h3 key={el.id}>{el.name}</h3>
              <img src={el.image} alt="recipe" key={el.id}/>
              {props.user === el.userId ? (
                <>
                  <button type="button" className="delBtn" id={el.id} key={el.id}>
                    Удалить
                  </button>
                  <button type="button" className="editBtn" id={el.id} key={el.id}>
                    Изменить
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </a>
        ))}
      </div>
    </Layout>
  );
};
