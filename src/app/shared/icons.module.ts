import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {
  Search,
  Map,
  MapPin,
  UploadCloud,
  Loader,
  X,
  Layers,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Plus,
  ExternalLink,
} from 'angular-feather/icons';

const icons = {
  Search,
  Map,
  MapPin,
  UploadCloud,
  Loader,
  X,
  Layers,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Plus,
  ExternalLink,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
