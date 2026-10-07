import cv2
import numpy as np
import os

video_path = "public/character.mp4"
frames_dir = "public/frames"
os.makedirs(frames_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

# Calibrated anchors around the 360-degree rotation (Screen coordinates):
# 0 rad (0°)     = RIGHT (frame 48)
# 0.25*pi (45°)  = DOWN-RIGHT (frame 71)
# 0.50*pi (90°)  = DOWN (frame 91)
# 0.75*pi (135°) = DOWN-LEFT (frame 103)
# 1.00*pi (180°) = LEFT (frame 114)
# 1.25*pi (225°) = UP-LEFT (frame 136)
# 1.38*pi (248°) = UP-UP-LEFT (frame 142)
# 1.44*pi (260°) = UP-LEFT-HIGH (frame 20)
# 1.50*pi (270°) = UP (frame 24)
# 1.75*pi (315°) = UP-RIGHT (frame 36)
# 2.00*pi (360°) = RIGHT (frame 48)

anchors = [
    (0.00 * np.pi, 48.0),
    (0.25 * np.pi, 71.0),
    (0.50 * np.pi, 91.0),
    (0.75 * np.pi, 103.0),
    (1.00 * np.pi, 114.0),
    (1.25 * np.pi, 136.0),
    (1.38 * np.pi, 142.0),
    (1.44 * np.pi, 20.0),
    (1.50 * np.pi, 24.0),
    (1.75 * np.pi, 36.0),
    (2.00 * np.pi, 48.0)
]

def get_source_frame(target_angle):
    target_angle = target_angle % (2.0 * np.pi)
    for i in range(len(anchors) - 1):
        a1, f1 = anchors[i]
        a2, f2 = anchors[i + 1]
        if a1 <= target_angle <= a2:
            t = (target_angle - a1) / (a2 - a1)
            # If transitioning between disjoint video segments (142 -> 20), snap at midpoint
            if abs(f2 - f1) > 50:
                return int(round(f1 if t < 0.5 else f2))
            return int(round(f1 + t * (f2 - f1)))
    return int(round(anchors[0][1]))

print("Re-extracting 64 WebP frames with calibrated top-left quadrant...")
for idx in range(64):
    angle = (idx / 64.0) * (2.0 * np.pi)
    src_frame_idx = get_source_frame(angle)
    src_frame_idx = max(0, min(total_frames - 1, src_frame_idx))
    
    cap.set(cv2.CAP_PROP_POS_FRAMES, src_frame_idx)
    ret, frame = cap.read()
    if ret:
        out_path = os.path.join(frames_dir, f"frame_{idx:02d}.webp")
        cv2.imwrite(out_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 92])
    if idx % 8 == 0 or (40 <= idx <= 50):
        print(f"Extracted frame {idx:02d}/64 (src frame {src_frame_idx:03d}, angle {np.degrees(angle):.1f}°)")

# Keep center neutral eye-contact frame (Frame 168)
cap.set(cv2.CAP_PROP_POS_FRAMES, 168)
ret, center_frame = cap.read()
if ret:
    cv2.imwrite("public/center.webp", center_frame, [cv2.IMWRITE_WEBP_QUALITY, 95])
    cv2.imwrite(os.path.join(frames_dir, "center.webp"), center_frame, [cv2.IMWRITE_WEBP_QUALITY, 95])

cap.release()
print("Calibration complete! All 64 frames re-extracted.")
