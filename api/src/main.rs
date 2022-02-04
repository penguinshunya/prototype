use axum::{response, routing::{get, post}, Router, extract};
use serde::{Serialize, Deserialize};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(handler))
        .route("/ping",  post(ping));
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn handler() -> response::Html<&'static str> {
    response::Html("<h1>Hello, world!</h1>")
}

#[derive(Deserialize)]
struct Ping {
    count: i64,
}

#[derive(Serialize)]
struct Pong {
    count: i64,
}

async fn ping(extract::Json(ping): extract::Json<Ping>) -> response::Json<Pong> {
    response::Json(Pong{
        count: ping.count + 1,
    })
}

#[cfg(test)]
mod tests {
    #[test]
    fn execute() {
        let v: Vec<i32> = vec![1, 2, 3];
        println!("{:?}", v);
    }
}
