extern crate api;
extern crate diesel;

use std::{net::SocketAddr, env};

use api::{establish_connection, models::{Post}};
use axum::{extract::Json, response::Html, routing::{get, post}, Router};
use serde::{Deserialize, Serialize};
use self::diesel::prelude::*;

#[tokio::main]
async fn main() {
    // use api::schema::posts;
    // let conn = establish_connection();
    // for _ in 0..5 {
    //     let new_post = NewPost {
    //         title: "title",
    //         body: "body",
    //     };
    //     diesel::insert_into(posts::table)
    //         .values(&new_post)
    //         .get_result::<Post>(&conn)
    //         .expect("Error saving new post");
    // }

    let port = env::var("PORT")
        .unwrap_or_else(|_| "3000".to_string())
        .parse()
        .expect("PORT must be a number");
    let app = Router::new()
        .route("/", get(handler))
        .route("/user/modify", post(modify_user))
        .route("/post/list", post(list_post));
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    println!("Listening on http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn handler() -> Html<&'static str> {
    Html("hello, world")
}

#[derive(Deserialize, Serialize)]
struct User {
    id: i32,
    name: String,
}

async fn modify_user(Json(payload): Json<User>) -> Json<User> {
    Json(User{ id: payload.id + 1, name: payload.name })
}

async fn list_post() -> Json<Vec<Post>> {
    use api::schema::posts::dsl::*;

    let conn = establish_connection();
    let results = posts
        .filter(published.eq(false))
        .limit(10)
        .load::<Post>(&conn)
        .expect("Error loading posts");
    Json(results)
}
