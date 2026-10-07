import cv2
import numpy as np
import os

cap = cv2.VideoCapture("public/character.mp4")
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

# Sample every 6 frames from 0 to 180 to inspect direction
os.makedirs("inspect_trajectory", exist_ok=True)
for i in range(0, total_frames, 6):
    cap.set(cv2.CAP_PROP_POS_FRAMES, i)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f"inspect_trajectory/f_{i:03d}.jpg", frame)

# Also sample last 10 frames to inspect neutral
for i in range(180, total_frames):
    cap.set(cv2.CAP_PROP_POS_FRAMES, i)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f"inspect_trajectory/center_cand_{i:03d}.jpg", frame)

# Detect the solid red background color from corner pixel
cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
ret, frame = cap.read()
if ret:
    # Corner pixels (x=20, y=20)
    b, g, r = frame[20, 20]
    hex_color = f"#{r:02x}{g:02x}{b:02x}"
    print(f"Detected Background Color: RGB({r}, {g}, {b}) -> {hex_color}")

cap.release()
print("Done sampling trajectory")
