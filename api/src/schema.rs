table! {
    posts (id) {
        id -> Unsigned<Bigint>,
        title -> Varchar,
        body -> Text,
        published -> Bool,
    }
}
