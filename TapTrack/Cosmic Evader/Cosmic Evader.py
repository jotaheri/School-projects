import pygame
import random
import math

# Start Pygame#
pygame.init()
pygame.mixer.init()

# Set up the display, game icon and caption
WIDTH = 800
HEIGHT = 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Cosmic Evader")

icon = pygame.image.load('spaceship.png')
pygame.display.set_icon(icon)

# Set up the clock
clock = pygame.time.Clock()

# Set up the text-color
WHITE = (255, 255, 255)

# Set up background image
bg_img = pygame.image.load('bg.png')
bg_height = bg_img.get_height()      # Get the height of the background image for scrolling

# Load and play the background music
pygame.mixer.music.load('retro.mp3')
pygame.mixer.music.set_volume(0.08)
pygame.mixer.music.play(-1)          # -1 means that the music will loop forever

# Set up the lives/hearts
heart_img = pygame.image.load('heart.png')
heart_img = pygame.transform.scale(heart_img, (30, 30)) # We scale some of the images to fit the screen better

# Set up the lifeline system
lives = 3

# Set up the top score
top_scores = [0]

# Set up the score
score = 0
font = pygame.font.Font('freesansbold.ttf', 36) #

# Set up the scrolling background
scroll = 0
panels = math.ceil(HEIGHT / bg_height) + 2 # Ensures that the background is long enough to cover the screen

# Set up the player
player_image = pygame.image.load("spaceship.png")
player_rect = player_image.get_rect().inflate(-10, -10) # We use inflate to make the player smaller
player_rect.x = 375
player_rect.y = 540
player_speed = 7

# Set up the obstacles
obstacle_width = 75
obstacle_height = 75
OBS_IMGS = [
    pygame.transform.scale(pygame.image.load("obs0.png"), (obstacle_width, obstacle_height)),
    pygame.transform.scale(pygame.image.load("obs1.png"), (obstacle_width, obstacle_height)),
    pygame.transform.scale(pygame.image.load("obs2.png"), (obstacle_width, obstacle_height))
]
obstacle_speed = 6
obstacle_gap = 100
obstacle_timer = 0
obstacles = []


# Game loop
running = True
while running:


    # Handle events, ends the loop if the player closes the window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
            
    # Move the player and makes sure player don't move outside of screen
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player_rect.x -= player_speed
        if player_rect.x < 0:
            player_rect.x = 0
    if keys[pygame.K_RIGHT]:
        player_rect.x += player_speed
        if player_rect.x + player_rect.width > WIDTH:
            player_rect.x = WIDTH - player_rect.width

    # Spawn obstacles
    # If the obstacle timer is 0 or greater than or equal to the obstacle gap, create a new obstacle
    if obstacle_timer == 0 or obstacle_timer >= obstacle_gap:
        obstacle_x = random.randint(0, WIDTH - obstacle_width)
        obstacle_y = -obstacle_height
        image = random.choice(OBS_IMGS)  # Assign a random image to the obstacle to make it more interesting
        obstacles.append({"rect": pygame.Rect(obstacle_x, obstacle_y, obstacle_width, obstacle_height).inflate(-10,-10), "image": image}) # This line creates a dictionary with the obstacle's rect and image as keys and the values as the rect and image itself. Also inflate the obstacles to make the hitbox feel better
        obstacle_timer = 1 
    else:
        obstacle_timer += 1 

    # Move obstacles
    # Move all obstacles downward, and remove obstacles that go off the screen and gradually increase the speed of the obstacles
    for obstacle in obstacles:
        obstacle["rect"].y += obstacle_speed
        if obstacle["rect"].y > HEIGHT:
            obstacles.remove(obstacle)
            score += 1
        if score == 5 or score == 10:
            obstacle_gap -= 0.17 
        if score % 10 == 0 and score != 0 and score != 10:
            obstacle_gap -= 0.1
            if obstacle_gap < 10: # Set a minimum limit for the obstacle_gap
                obstacle_gap = 10

    # Check for collision
    # Check for collision between the player and obstacles, and reduce the number of lives if there is a collision
    game_over = False
    for obstacle in obstacles:
        if player_rect.colliderect(obstacle["rect"]):
            lives -= 1 # Reduce the number of lives
            obstacles.remove(obstacle)

    # Check if game is over
    if lives == 0:
        game_over = True
        pygame.mixer.music.set_volume(0.03) # Extra quality of life feature, reduces the volume of the music when the game is over
        # Reset the player and obstacles
        player_rect.x = 375
        player_rect.y = 540
        obstacles = []
        obstacle_gap = 100
        

    if game_over:
        # Update top scores
        top_scores.append(score)
        top_scores.sort(reverse=True)
        top_scores = top_scores[:3]

        # Display top scores
        top_scores_text = font.render("Top Score: " + str(top_scores[0]), True, WHITE)
        screen.blit(top_scores_text, (20, 20))

        # Display game over, try again message
        try_again_text = font.render("Press 'Space' To Try Again", True, WHITE)
        game_over_text = font.render("Game Over!", True, WHITE)
        screen.blit(try_again_text, (170, 300))
        screen.blit(game_over_text, (290, 250))
        pygame.display.update()

        # Wait for player to press a space to restart the game
        waiting = True
        while waiting:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                    waiting = False
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE:
                        # Restart the game
                        player_rect.x = 375
                        player_rect.y = 540
                        obstacles = []
                        score = 0
                        lives = 3
                        obstacle_gap = 100
                        pygame.mixer.music.set_volume(0.1) # Resets volume
                        waiting = False

                        
    # For-loop that scrolls the background image
    for i in range(panels):
        screen.blit(bg_img, (0,i * bg_height + scroll - bg_height)) # This line makes the background image scroll
    scroll += 5
    if abs(scroll) > bg_height: # Reset image when its finished scrolling
        scroll = 0
        
    # Display hearts
    for i in range(lives):
        screen.blit(heart_img, (WIDTH - 150 + i * 40, 60))

    # Display score and top score, obstacles and player image so that they are on top of the background image

    for obstacle in obstacles:
        screen.blit(obstacle["image"], obstacle["rect"]) 
    score_text = font.render("Score: " + str(score), True, WHITE)
    screen.blit(score_text, (WIDTH - 200, 20))
    top_scores_text = font.render("Top Score: " + str(top_scores[0]), True, WHITE)
    screen.blit(top_scores_text, (20, 20))
    screen.blit(player_image, player_rect) 

    pygame.display.update()
    
    # Set the frame-rate
    clock.tick(60)

# Clean up Pygame
pygame.mixer.music.stop()
pygame.quit()



