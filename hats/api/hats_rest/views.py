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
        "shelf_number",
        "section_number",
    ]

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "style",
        "color",
        "fabric",
        "picture_url",
        "location",
    ]

    def get_extra_data(self, o):
        return {"location": o.location.closet_name}

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
    elif request.method == "POST":
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location href"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_show_hat(request, id):
    """
    Returns the details for the Hat model specified by the pk parameter.

    This should return a dictionary with id, style, color, fabric, picture_url,
    and location properties for the specified Hat instance.

    {
        "id": the hat's id,
        "style": the hat's style name,
        "color": the hat's color,
        "fabric": the hat's fabric type,
        "picture_url": the url to the hat's image,
        "location": {
            "import_href": the href value of the LocationVO,
            "closet_name": the closet that the hat is in,
            "shelf_number": the shelf of the closet the hat is in,
            "section_number": the shelf of the section the hat is in,
        }
    }
    """

    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse({'deleted': count > 0})
