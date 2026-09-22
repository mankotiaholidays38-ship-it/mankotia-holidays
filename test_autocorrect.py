import ai_service
import os

try:
    print(ai_service.autocorrect_location_name('Himalchal Predash'))
except Exception as e:
    print('Exception:', e)
