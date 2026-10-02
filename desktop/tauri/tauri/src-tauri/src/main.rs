#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{webview::NewWindowResponse, Url, WebviewWindowBuilder};

fn is_internal_app_url(url: &Url) -> bool {
    match url.scheme() {
        "tauri" | "asset" => true,
        "http" | "https" => matches!(url.host_str(), Some("tauri.localhost") | Some("localhost")),
        _ => false,
    }
}

fn open_external_if_allowed(url: &Url) {
    if matches!(url.scheme(), "http" | "https" | "mailto") {
        if let Err(error) = open::that(url.as_str()) {
            eprintln!("Unable to open external link: {error}");
        }
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window_config =
                app.config().app.windows.first().expect("missing primary window configuration");

            WebviewWindowBuilder::from_config(app, window_config)?
                .on_navigation(|url| {
                    if is_internal_app_url(url) {
                        true
                    } else {
                        open_external_if_allowed(url);
                        false
                    }
                })
                .on_new_window(|url, _features| {
                    open_external_if_allowed(&url);
                    NewWindowResponse::Deny
                })
                .build()?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running FedPromptly Muse Audit");
}
