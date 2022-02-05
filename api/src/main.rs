use std::{net::SocketAddr, env};

use axum::{
    extract::Json,
    response::Html, 
    routing::{get, post}, Router,
};
use serde::{Deserialize, Serialize};

#[tokio::main]
async fn main() {
    let port = env::var("PORT")
        .unwrap_or_else(|_| "3000".to_string())
        .parse()
        .expect("PORT must be a number");
    let app = Router::new()
        .route("/", get(handler))
        .route("/user/modify", post(modify_user));
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
