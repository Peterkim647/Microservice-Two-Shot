from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Shoe


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
    ]

class ShoeDetailEncoder(ModelEncoder):
    model= Shoe
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
    ]


@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoe = Shoe.objects.all()
        return JsonResponse(
            {"shoe": shoe},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeListEncoder,
            safe=False,
        )




@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        try:
            shoe = Shoe.objects.get(id=pk)
            return JsonResponse(
                shoe,
                encoder=ShoeDetailEncoder,
                safe=False
            )
        except Shoe.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            shoe = Shoe.objects.get(id=pk)
            shoe.delete()
            return JsonResponse(
                shoe,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            shoe = Shoe.objects.get(id=pk)

            props = ["manufacturer", "model_name", "color", "picture_url"]
            for prop in props:
                if prop in content:
                    setattr(shoe, prop, content[prop])
            shoe.save()
            return JsonResponse(
                shoe,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
