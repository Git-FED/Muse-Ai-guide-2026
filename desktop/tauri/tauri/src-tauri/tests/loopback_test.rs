#[path = "../src/auth/loopback.rs"]
mod loopback;

#[test]
fn loopback_redirect_is_ipv4_localhost() {
    let listener = loopback::bind_localhost().expect("localhost listener");
    let redirect = loopback::redirect_uri(&listener).expect("redirect URI");
    assert!(redirect.starts_with("http://127.0.0.1:"));
    assert!(redirect.ends_with("/oauth/callback"));
}
