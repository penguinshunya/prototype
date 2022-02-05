use std::{net::SocketAddr, env};

use axum::{response::Html, routing::get, Router};

#[tokio::main]
async fn main() {
    let port = env::var("PORT")
        .unwrap_or_else(|_| "3000".to_string())
        .parse()
        .expect("PORT must be a number");
    let app = Router::new().route("/", get(handler));
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
