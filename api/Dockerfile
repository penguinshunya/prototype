FROM rust:1.58
WORKDIR /app
COPY . .
RUN cargo build --release
CMD ["./target/release/api"]
