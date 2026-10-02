use std::io;
use std::net::{IpAddr, Ipv4Addr, SocketAddr, TcpListener};

/// Optional OAuth loopback primitive. It deliberately binds to IPv4 localhost
/// only and is not wired into the offline-first application.
pub fn bind_localhost() -> io::Result<TcpListener> {
    TcpListener::bind(SocketAddr::new(IpAddr::V4(Ipv4Addr::LOCALHOST), 0))
}

pub fn redirect_uri(listener: &TcpListener) -> io::Result<String> {
    let address = listener.local_addr()?;
    if address.ip() != IpAddr::V4(Ipv4Addr::LOCALHOST) {
        return Err(io::Error::new(io::ErrorKind::PermissionDenied, "listener is not localhost"));
    }
    Ok(format!("http://127.0.0.1:{}/oauth/callback", address.port()))
}
