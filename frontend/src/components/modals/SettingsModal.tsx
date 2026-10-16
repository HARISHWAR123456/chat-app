import { useState } from "react";
import { X, Sliders, Volume2, Bell, CornerDownLeft } from "lucide-react";
import { soundFX } from "../../utils/sound";
import "./SettingsModal.css";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [soundEnabled, setSoundEnabled] = useState(soundFX.enabled);
  const [enterToSend, setEnterToSend] = useState(true);
  const [notifications, setNotifications] = useState(false);

  if (!isOpen) return null;

  const handleSoundToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
    if (next) {
      soundFX.playReceive();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card settings-modal-card animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge">
              <Sliders size={18} />
            </div>
            <div>
              <h3>Preferences</h3>
              <p>Customize your chat and sound experience</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close settings">
            <X size={18} />
          </button>
        </div>

        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-item-info">
              <div className="settings-icon">
                <Volume2 size={16} />
              </div>
              <div>
                <span className="settings-item-title">Message Sound Effects</span>
                <p className="settings-item-desc">Play a subtle chime on incoming & outgoing messages</p>
              </div>
            </div>
            <button
              type="button"
              className={`toggle-switch ${soundEnabled ? "on" : "off"}`}
              onClick={handleSoundToggle}
              role="switch"
              aria-checked={soundEnabled}
              aria-label="Toggle sound"
            >
              <span className="toggle-thumb" />
            </button>
          </div>

          <div className="settings-item">
            <div className="settings-item-info">
              <div className="settings-icon">
                <CornerDownLeft size={16} />
              </div>
              <div>
                <span className="settings-item-title">Press Enter to Send</span>
                <p className="settings-item-desc">Use Shift + Enter to add a new line without sending</p>
              </div>
            </div>
            <button
              type="button"
              className={`toggle-switch ${enterToSend ? "on" : "off"}`}
              onClick={() => setEnterToSend(!enterToSend)}
              role="switch"
              aria-checked={enterToSend}
              aria-label="Toggle enter to send"
            >
              <span className="toggle-thumb" />
            </button>
          </div>

          <div className="settings-item">
            <div className="settings-item-info">
              <div className="settings-icon">
                <Bell size={16} />
              </div>
              <div>
                <span className="settings-item-title">Desktop Notifications</span>
                <p className="settings-item-desc">Receive OS notifications when the window is in the background</p>
              </div>
            </div>
            <button
              type="button"
              className={`toggle-switch ${notifications ? "on" : "off"}`}
              onClick={() => {
                if (!notifications && "Notification" in window) {
                  Notification.requestPermission().then((perm) => {
                    setNotifications(perm === "granted");
                  });
                } else {
                  setNotifications(!notifications);
                }
              }}
              role="switch"
              aria-checked={notifications}
              aria-label="Toggle notifications"
            >
              <span className="toggle-thumb" />
            </button>
          </div>
        </div>

        <div className="settings-footer">
          <button type="button" className="btn-settings-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-settings-done" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
