gcloud builds submit --tag asia.gcr.io/upbeat-glow-336702/rust-api-server
gcloud run deploy rust-api-server --image asia.gcr.io/upbeat-glow-336702/rust-api-server
