import cv2
import os

cap = cv2.VideoCapture("public/character.mp4")

# Let's inspect frames around each compass point in detail:
# UP: 20..28
# UP-RIGHT: 33..39
# RIGHT: 45..52
# DOWN-RIGHT: 68..74
# DOWN: 88..94
# DOWN-LEFT: 100..106
# LEFT: 112..118
# UP-LEFT: 134..140
# BACK TO UP: 156..162
# CENTER: 165..172

os.makedirs("inspect_compass", exist_ok=True)
points = {
    "UP_1": range(22, 27),
    "UP_RIGHT": range(34, 40),
    "RIGHT": range(46, 52),
    "DOWN_RIGHT": range(69, 75),
    "DOWN": range(89, 95),
    "DOWN_LEFT": range(101, 107),
    "LEFT": range(112, 118),
    "UP_LEFT": range(134, 140),
    "UP_2": range(156, 162),
    "CENTER": range(166, 172)
}

for name, r in points.items():
    for f in r:
        cap.set(cv2.CAP_PROP_POS_FRAMES, f)
        ret, frame = cap.read()
        if ret:
            cv2.imwrite(f"inspect_compass/{name}_{f:03d}.jpg", frame)

cap.release()
print("Saved compass candidate frames")
