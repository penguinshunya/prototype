extern crate api;
extern crate diesel;

use self::diesel::prelude::*;
use api::*;
use std::env::args;

fn main() {
    use api::schema::posts::dsl::*;

    let target = args().nth(1).unwrap();
    let pattern = format!("%{}%", target);

    let connection = establish_connection();
    let num_deleted = diesel::delete(posts.filter(title.like(pattern)))
        .execute(&connection).expect("Error deleting posts");

    println!("Deleted {} posts", num_deleted);
}
