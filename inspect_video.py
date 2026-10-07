import cv2
import os

video_path = "public/character.mp4"
if not os.path.exists(video_path):
    print(f"Error: {video_path} does not exist")
    exit(1)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
duration = total_frames / fps if fps > 0 else 0

print(f"Total Frames: {total_frames}")
print(f"FPS: {fps}")
print(f"Resolution: {width}x{height}")
print(f"Duration: {duration:.2f} seconds")

# Also sample every 10% of frames and save to a temporary inspect folder to inspect head angles
os.makedirs("inspect_frames", exist_ok=True)
step = max(1, total_frames // 20)
for i in range(0, total_frames, step):
    cap.set(cv2.CAP_PROP_POS_FRAMES, i)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f"inspect_frames/frame_{i:04d}.jpg", frame)

cap.release()
print(f"Saved sample frames to inspect_frames/")
