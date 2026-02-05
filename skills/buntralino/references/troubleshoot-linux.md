# Troubleshooting Linux GUI Launch

Buntralino uses Neutralino, which requires libwebkit2gtk v4.0 or v4.1 to create GUI windows on Linux. If a window does not open, install the dependency below.

## Ubuntu and Debian
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.0-37
```

## Fedora
```bash
sudo dnf install webkit2gtk3
```

## Arch Linux
```bash
sudo pacman -S webkit2gtk
```

## openSUSE
```bash
sudo zypper install libwebkit2gtk-4_0-37
```
