import { useState, useEffect, type FormEvent } from "react";
import { X, LogOut, Mail, User as UserIcon, Pencil, Check, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, updateUserProfile } from "../../features/user/userSlice";
import { UserService } from "../../services/user/userService";
import { getAvatarGradient, getInitials } from "../../utils/avatar";
import { useNavigate } from "react-router-dom";
import "./ProfileModal.css";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  const handleClose = () => {
    setIsEditingUsername(false);
    setUpdateError(null);
    setUpdateSuccess(null);
    onClose();
  };

  // Fetch current user details from Spring Boot backend whenever modal opens
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    UserService.getProfile()
      .then((profile) => {
        if (isMounted) {
          dispatch(updateUserProfile(profile));
        }
      })
      .catch((err) => {
        console.error("Failed to load user profile:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/login");
  };

  const handleStartEdit = () => {
    setNewUsername(user?.username || "");
    setUpdateError(null);
    setUpdateSuccess(null);
    setIsEditingUsername(true);
  };

  const handleCancelEdit = () => {
    setIsEditingUsername(false);
    setUpdateError(null);
  };

  const handleSaveUsername = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newUsername.trim();

    if (!trimmed) {
      setUpdateError("Username cannot be empty");
      return;
    }

    if (trimmed.length < 3 || trimmed.length > 20) {
      setUpdateError("Username must be between 3 and 20 characters");
      return;
    }

    if (trimmed === user?.username) {
      setUpdateError("New username cannot be the same as your current username");
      return;
    }

    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const updatedUser = await UserService.updateUsername(trimmed);
      dispatch(updateUserProfile(updatedUser));
      setUpdateSuccess("Username updated successfully!");
      setIsEditingUsername(false);
      setTimeout(() => {
        setUpdateSuccess(null);
      }, 3500);
    } catch (err: unknown) {
      setUpdateError(err instanceof Error ? err.message : "Failed to update username");
    } finally {
      setUpdateLoading(false);
    }
  };

  const username = user?.username || "Guest User";
  const initials = getInitials(username);
  const gradient = getAvatarGradient(user?.id || username);

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal-card profile-card animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="profile-banner">
          <button
            className="modal-close-btn profile-close"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="profile-body">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar" style={{ background: gradient }}>
              <span>{initials}</span>
              <span className="profile-online-badge" />
            </div>
          </div>

          <div className="profile-header-info">
            <h2>{username}</h2>
            <p className="profile-status">Active now &bull; Nexa Workspace</p>
          </div>

          {updateError && (
            <div className="profile-alert error animate-fade-in">
              {updateError}
            </div>
          )}

          {updateSuccess && (
            <div className="profile-alert success animate-fade-in">
              {updateSuccess}
            </div>
          )}

          {/* Essential Details Only: Username and Email */}
          <div className="profile-details-list">
            {/* Username Row with Edit Feature */}
            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <UserIcon size={16} />
              </div>
              <div className="profile-detail-content">
                <span className="profile-detail-label">Username</span>

                {isEditingUsername ? (
                  <form onSubmit={handleSaveUsername} className="profile-edit-form">
                    <input
                      type="text"
                      className="profile-username-input"
                      value={newUsername}
                      onChange={(e) => {
                        setNewUsername(e.target.value);
                        setUpdateError(null);
                      }}
                      placeholder="Enter new username"
                      minLength={3}
                      maxLength={20}
                      autoFocus
                      disabled={updateLoading}
                    />
                    <div className="profile-edit-btn-group">
                      <button
                        type="submit"
                        className="btn-save-inline"
                        disabled={
                          updateLoading ||
                          !newUsername.trim() ||
                          newUsername.trim() === user?.username
                        }
                        title="Save username"
                        aria-label="Save username"
                      >
                        {updateLoading ? (
                          <Loader2 size={14} className="spinning" />
                        ) : (
                          <Check size={14} />
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn-cancel-inline"
                        onClick={handleCancelEdit}
                        disabled={updateLoading}
                        title="Cancel"
                        aria-label="Cancel"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-detail-row">
                    <span className="profile-detail-val">
                      {username}
                    </span>
                    <button
                      type="button"
                      className="btn-edit-inline"
                      onClick={handleStartEdit}
                      title="Edit username"
                      aria-label="Edit username"
                    >
                      <Pencil size={13} />
                      <span>Edit</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Email Address Row */}
            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <Mail size={16} />
              </div>
              <div className="profile-detail-content">
                <span className="profile-detail-label">Email Address</span>
                <span className="profile-detail-val">
                  {user?.email || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-logout" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
