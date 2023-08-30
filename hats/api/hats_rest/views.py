from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import LocationVO, Hat

class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
        "section_number",
        "shelf_number",
    ]
class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "style",
        "picture_url",
    ]

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "style",
        "color",
        "fabric",
        "picture_url",
        "location",
    ]
    encoders = {"location": LocationVOEncoder()}

@require_http_methods(["GET", "POST"])
def api_list_hats(request):
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        # try:
        #     location_href = content["location"]
        #     location = LocationVO.objects.get(import_href=location_href)
        #     content["location"] = location
        # except LocationVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid location id"}
        #         status=400,
        #     )

        # hat = Hat.objects.create(**content)
        # return JsonResponse(
        #     hat,
        #     encoder=HatListEncoder,
        #     safe=False,
        # )
