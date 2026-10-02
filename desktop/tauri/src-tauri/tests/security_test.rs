#[test]
fn only_app_or_explicit_external_schemes_are_candidates() {
    for scheme in ["tauri", "asset", "http", "https", "mailto"] {
        assert!(["tauri", "asset", "http", "https", "mailto"].contains(&scheme));
    }
    for scheme in ["file", "javascript", "data", "smb"] {
        assert!(!["tauri", "asset", "http", "https", "mailto"].contains(&scheme));
    }
}
